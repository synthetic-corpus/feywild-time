import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

// Business Logic Layer
import { addFeywildImage } from '../../02BusinessLogic/feywildLogic'

const logger = createLogger("** Http Layer **")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  
  /* Implment Authorization here when ready */
  const userID = getUserId(event)
  const feywildID: string = JSON.parse(event.pathParameters.feywildID)
  const body = JSON.parse(event.body)
  const feywildImageUpdate = await addFeywildImage(body.feywildImage, feywildID, userID)
  const imageFullname: string = feywildID + body.feywildImage // Used for uniquness with s3 Bucket.
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${JSON.stringify(event)}`)
  
  if (!feywildImageUpdate.uploadURL || !feywildImageUpdate.success) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Calender was not created.'
      })
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: {
        signedURL: feywildImageUpdate.uploadURL,
        fullname: imageFullname,
        message: "Please renname the image file to the 'fullname' before using the upload URL"
      }
    })
  }
}
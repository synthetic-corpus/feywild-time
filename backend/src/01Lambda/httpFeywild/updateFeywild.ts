import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

// Business Logic Layer
import { updateFeywild } from '../../02BusinessLogic/feywildLogic'
import { FeywildUpdateRequest } from '../../requests/FeywildUpdateRequest'

const logger = createLogger("** Http Layer **")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  /* Implment Authorization here when ready */
  const userID = getUserId(event)
  const feywildUpdate: FeywildUpdateRequest = JSON.parse(event.body)
  const feywildID: string = JSON.parse(event.pathParameters.feywildID)
  const updatedItem = await updateFeywild(feywildUpdate, feywildID, userID)
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${event}`)
  
  if (!updatedItem) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Calender was not updated.'
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
      item: updatedItem
    })
  }
}
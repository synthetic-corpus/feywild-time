import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

// Business Logic Layer
import { retrieveFeywild } from '../../02BusinessLogic/feywildLogic'

const logger = createLogger("** Http Layer **")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${JSON.stringify(event.pathParameters)}`)
  
  /* Implment Authorization here when ready */
  const userID = getUserId(event)
  const feywildID = JSON.parse(event.pathParameters.feywildID)
  const retrievedItem = await retrieveFeywild(feywildID, userID)
  
  
  if (!retrievedItem.feywildID) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Calender was not retrieved.'
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
      item: retrievedItem
    })
  }
}
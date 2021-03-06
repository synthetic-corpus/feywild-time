import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

// Business Logic Layer
import { retrieveAllFeywilds } from '../../02BusinessLogic/feywildLogic'

const logger = createLogger("** Http Layer **")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(`HTTP Layer`)
  
  /* Implment Authorization here when ready */
  const userID = getUserId(event)
  const retrievedItems = await retrieveAllFeywilds(userID)
  console.log(`My Empty Array is ${retrievedItems})`)
  if (retrievedItems.length > 0 && retrievedItems[0].hasOwnProperty("error")) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        ...retrievedItems[0]
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
      item: retrievedItems
    })
  }
}
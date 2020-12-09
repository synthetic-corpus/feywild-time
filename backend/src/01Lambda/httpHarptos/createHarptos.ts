import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

// Business Logic Layer
import { createHarptos } from '../../02BusinessLogic/harptosLogic'

const logger = createLogger("** Http Layer **")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  
  /* Implment Authorization here when ready */
  const userID = getUserId(event)
  const body = JSON.parse(event.body)
  const newItem = await createHarptos(body.day, body.year, userID)
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${JSON.stringify(event)}`)
  
  if (!newItem.harptosID) {
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
      item: newItem
    })
  }
}
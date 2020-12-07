import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

// Business Logic Layer
import { updateHarptos } from '../../02BusinessLogic/harptosLogic'
import { HarptosUpdateRequest } from '../../requests/HarptosUpdateRequest'

const logger = createLogger("** Http Layer **")
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  /* Implment Authorization here when ready */
  const userID = getUserId(event)
  const harptosUpdate: HarptosUpdateRequest = JSON.parse(event.body)
  const harptosID: string = event.pathParameters.harptosID
  const updatedItem = await updateHarptos(harptosUpdate, harptosID, userID)
  logger.info(`HTTP Layer`)
  logger.info(`Processing event ${JSON.stringify(event)}`)
  
  if (!updatedItem.calenderID) {
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
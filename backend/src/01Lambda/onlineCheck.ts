/* 
    This module exists only to confirm that API is up.
    Wrote this because I wanted to set the API Gateway URL to 
    CNAME on my personal domain.
*/
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    const url = event.headers.Host
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            "message": `API Gateway is up on ${url}!`
        })
    }
}
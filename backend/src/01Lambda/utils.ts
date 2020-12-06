import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {

  const authorization = event.headers.Authorization // The Front end sends this in capital.
  console.log(`Authorization is ${authorization}`)
  const split = authorization.split(' ')
  console.log(`Split is ${split}`)
  const jwtToken = split[1]
  console.log(`Jwt Token is ${jwtToken}`)
  console.log(`User ID is ${parseUserId(jwtToken)}`)
  return parseUserId(jwtToken)
}

export function httpLog(event: APIGatewayProxyEvent): void {
  /* To console Log things on the HTTP layer. */
  console.log("*** HTTP LAYER ***")
  const headers = event.headers
  const body = event.body
  console.log (`Got the following Headers, ${headers}`)
  console.log(`got the following body, ${body}`)
}
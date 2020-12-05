import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'



const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set



export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)
    
    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

/*

Will only implement this when I'm ready to do authentications
*/

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  // Uncertain why the jwt item is here. Comment out for now.
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  const rawCert = await matchToKey(jwt.header.kid)
  const cert = stringToPEM(rawCert)
  
  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  return verify(token, cert, { algorithms: ['RS256']}) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')
  
  const split = authHeader.split(' ')
  
  const token = split[1]

  return token
}

async function matchToKey(kid: string) {
  // takes the header from the JWT token and matches to the right Key.
  logger.info(`Matching to ${kid}`)
  try{
    const actualKeys = await Axios.get('https://dev-jtg.us.auth0.com/.well-known/jwks.json')
    const signerKey = actualKeys.data.keys.filter(key => {key[kid] === kid})[0] || actualKeys.data.keys[0]
    logger.info(actualKeys.data.keys)
    logger.info(`Singer Key found was ${signerKey}`)
    const x5cKey: string = signerKey.x5c[0]
    if(!x5cKey){
      logger.info(`Could Not Match Keys!!`)
      throw new Error(`Unable to Match any Keys. x5cKey not extracted.`)
    }

    return x5cKey
  }catch(e){
    logger.info(`Could not authenticate. ${JSON.stringify(e)}`)
  }
  
}

function stringToPEM(cert: string) {
  cert = cert.match(/.{1,64}/g).join('\n');
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
  return cert;
}
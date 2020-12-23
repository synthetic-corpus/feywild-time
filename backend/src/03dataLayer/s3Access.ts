import * as AWS  from 'aws-sdk'
import { SignedURLRequest } from '../requests/SignedURLRequest'
import { createLogger } from '../utils/logger'
const logger = createLogger('s3 Access')

export class S3Access {
    constructor(
        private bucket = process.env.PHOTO_BUCKET,
        private expiration = process.env.BUCKET_EXPIRATION,
        private s3 = new AWS.S3({signatureVersion: 'v4'})
    ){}
    async getUploadURL(feywildImage: string):Promise<string>{
        const request: SignedURLRequest = {
            Bucket: this.bucket,
            Key: feywildImage,
            Expires: +this.expiration
        }
        logger.info('*** S3 Access Layer ***')
        logger.info('Retrieving s3 Upload URL')
        try{
            const uploadURL = await this.s3.getSignedUrlPromise('putObject',request)
            logger.info(`Retrieved Upload URL. Returing ${uploadURL}`)
            return uploadURL
        }catch(e){
            logger.error(`s3 Upload URL Failed. With error ${e}`)
            return undefined // Will cause an error. That's the idea.
        }
    }
    async getGetSignedURL(feywildImage: string ): Promise<string> {
        const request: SignedURLRequest = {
            Bucket: this.bucket,
            Key: feywildImage,
            Expires: +this.expiration
        }
        logger.info('*** S3 Access Layer ***')
        logger.info('Retrieving s3 Upload URL')
        try{
            const downloadURL = await this.s3.getSignedUrlPromise('getObject',request)
            logger.info(`Retrieved Downloand URL. Returing ${downloadURL}`)
            return downloadURL
        }catch(e){
            logger.error(`s3 Upload URL Failed. With error ${e}`)
            return undefined // Will cause an error. That's the idea.
        }
    }
}  
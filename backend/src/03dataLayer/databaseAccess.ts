import * as AWS  from 'aws-sdk'


import { HarptosCalendar, HarptosUpdate } from "../models/harptos"
import { FeywildCalendar, FeywildUpdate } from "../models/feywild"
import { StandardHarptos } from "../gameObjects/standardHarptos"
import { createLogger } from "../utils/logger"


const logger = createLogger('Database Layer')


export class HarptosDB {
    constructor(
        private documentClient = new AWS.DynamoDB.DocumentClient(),
        private table = process.env.HARPTOS_TABLE
    ){
        if (process.env.IS_OFFLINE){
            console.log("Connecting to Offline DB")
            this.documentClient = new AWS.DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            })
        }
    }

    async createHarptos(harptosCalendar: HarptosCalendar){
        const inputs = {
            TableName: this.table,
            Item: harptosCalendar
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Writing to table ${this.table}`)
        logger.info(inputs)
        await this.documentClient.put(inputs).promise()
        logger.info("Item Created")
        return harptosCalendar
    }

    async retrieveHarptos(harptosID: string, userID: string): Promise<HarptosCalendar>{
        const inputs = {
            TableName: this.table,
            Key: {
                harptosID,
                userID
            }
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Retrieving from table ${this.table} for ${userID}`)
        logger.info(inputs)
        const result = await this.documentClient.get(inputs).promise()
        return result.Item as HarptosCalendar
    }

    async updateHarptos(harptosUpdate: HarptosUpdate, harptosID: string, userID: string): Promise<Object> {
        const inputs = {
            TableName: this.table,
            Key: {
                userID,
                harptosID
            },
            UpdateExpression: `set currentDay = :c, harptosYear = :y, days = :d`, // Update 'instructions' similiar to writing a raw SQL request
            // Provide the variables for the instructions above.
            ExpressionAttributeValues: {
                ':c': harptosUpdate.currentDay,
                ':y': harptosUpdate.harptosYear,
                ':d': harptosUpdate.days
            }
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Updating ${this.table} for ${userID}`)
        logger.info(inputs)
        const updatedThing = await this.documentClient.update(inputs).promise()
        return updatedThing as Object
    }

    async deleteHarptos(harptosID: string, userID: string): Promise<Object> {
        const inputs = {
            TableName: this.table,
            Key: {
                userID,
                harptosID
            },
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Delete on ${this.table} for ${harptosID}`)
        logger.info(inputs)
        const deletion = await this.documentClient.delete(inputs).promise()
        return {"message": `Simulating deleting ${harptosID} from user ${userID}`,deletion}
    }

    generateMockHarptos(harptosID: string, userID: string, currentDay: number, harptosYear: number): HarptosCalendar {
        /* This function for testing only */
        const newCalendar: HarptosCalendar = {
            createdAt: (new Date()).toString(),
            harptosID,
            userID,
            currentDay,
            harptosYear,
            days: StandardHarptos
        }
        return newCalendar
    }
}

export class FeywildDB {
    constructor(
        private documentClient = new AWS.DynamoDB.DocumentClient(),
        private table = process.env.FEYWILD_TABLE,
        private index = process.env.FEYWILD_INDEX
    ) {
        if (process.env.IS_OFFLINE){
            console.log("Connecting to Offline DB")
            this.documentClient = new AWS.DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000'
            })
        }
    }

    async createFeywild(feywildCalendar: FeywildCalendar){
        const inputs = {
            TableName: this.table,
            Item: feywildCalendar
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Writing to table ${this.table}`)
        logger.info(inputs)
        await this.documentClient.put(inputs).promise()
        logger.info("Item Created")
        return feywildCalendar
    }

    async retrieveFeywild(feywildID: string, userID: string){
        const inputs = {
            TableName: this.table,
            Key: {
                feywildID,
                userID
            }
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Retrieving from table ${this.table} for ${userID}`)
        logger.info(inputs)
        const result = await this.documentClient.get(inputs).promise()
        return result.Item as FeywildCalendar
    }

    async retrieveAllFeywilds(userID: string){
        const inputs = {
            TableName: this.table,
            IndexName: this.index,
            KeyConditionExpression: 'userID = :userID',
            ExpressionAttributeValues: {
              ':userID': userID,
            }
          }
        logger.info("*** Database Access Layer ***")
        logger.info(`Retrieving from table ${this.table} for ${userID}`)
        const array = await this.documentClient.query(inputs).promise()
        console.log(array)
        return array.Items
    }
    async updateFeywild(feywildUpdate: FeywildUpdate, feywildID: string, userID: string): Promise<Object>{
        const inputs = {
            TableName: this.table,
            Key: {
                userID,
                feywildID
            },
            UpdateExpression: `set #feywildName = :n, dilation = :d, currentSegment = :s, #feySegments = :fs`, // Update 'instructions' similiar to writing a raw SQL request
            // Provide the variables for the instructions above.
            ExpressionAttributeValues: {
                ':n': feywildUpdate.feywildName,
                ':d': feywildUpdate.dilation,
                ':s': feywildUpdate.currentSegment,
                ':fs': feywildUpdate.feySegments
            },
            ExpressionAttributeNames: {
                '#feySegments': 'feySegments',
                '#feywildName': 'feywildName'
            }
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Updating ${this.table} for ${userID}`)
        logger.info(inputs)
        const updatedThing = await this.documentClient.update(inputs).promise()
        return updatedThing as Object
    }

    async updateImage(feyImageFull: string, feywildID: string, userID: string): Promise<boolean>{
        
        const inputs = {
            TableName: this.table,
            Key: {
                userID,
                feywildID
            },
            
            UpdateExpression: `set #feyImage = :i`, // Update 'instructions' similiar to writing a raw SQL request
            // Provide the variables for the instructions above.
            ExpressionAttributeValues: {
                ':i': feyImageFull
            },
            ExpressionAttributeNames: {
                '#feyImage': 'feyImage'
            }
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Adding/Update immage link ${this.table} for ${userID}`)
        logger.info(inputs)
        try{
            const update = await this.documentClient.update(inputs).promise()
            logger.info(update)
            return true
        }catch(e){
            logger.error(e)
            return false
        }
    }

    async deleteFeywild(feywildID: string, userID: string): Promise<Object>{
        const inputs = {
            TableName: this.table,
            Key: {
                userID,
                feywildID
            },
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Delete on ${this.table} for ${feywildID}`)
        logger.info(inputs)
        const deletion = await this.documentClient.delete(inputs).promise()
        return {"message": `Simulating deleting ${feywildID} from user ${userID}`,deletion}
    }
}
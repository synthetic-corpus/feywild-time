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

    deleteHarptos(harptosID: string, userID: string): Object {
        return {"message": `Simulating deleting ${harptosID} from user ${userID}`}
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
        private table = process.env.FEYWILD_TABLE
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
                '#feySegments': 'feySegment',
                '#feywildName': 'feywildName'
            }
        }
        logger.info("*** Database Access Layer ***")
        logger.info(`Updating ${this.table} for ${userID}`)
        logger.info(inputs)
        const updatedThing = await this.documentClient.update(inputs).promise()
        return updatedThing as Object
    }

    deleteFeywild(feywildID: string, userID: string){
        return {"message": `Simulating deleting ${feywildID} from user ${userID}`}
    }
}
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

    updateHarptos(harptosUpdate: HarptosUpdate, harptosID: string, userID: string): HarptosCalendar {
        const updatedThing = {
            harptosID,
            userID,
            createdAt: (new Date()).toString(),
            ...harptosUpdate
        }
        return updatedThing
    }

    deleteHarptos(harptosID: string, userID: string): Object {
        return {"message": `Simulating deleting ${harptosID} from user ${userID}`}
    }

    generateMockHarptos(harptosID: string, userID: string, currentDay: number, year: number): HarptosCalendar {
        /* This function for testing only */
        const newCalendar: HarptosCalendar = {
            createdAt: (new Date()).toString(),
            harptosID,
            userID,
            currentDay,
            year,
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

    updateFeywild(feywildUpdate: FeywildUpdate, feywildID: string, userID: string){
        const updatedThing = {
            createdAt: (new Date()).toString(),
            feywildID,
            userID,
            ...feywildUpdate
        }
        return updatedThing
    }

    deleteFeywild(feywildID: string, userID: string){
        return {"message": `Simulating deleting ${feywildID} from user ${userID}`}
    }
}
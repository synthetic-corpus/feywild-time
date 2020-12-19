import * as AWS  from 'aws-sdk'


import { HarptosCalendar, HarptosUpdate } from "../models/harptos"
import { FeywildCalendar, FeywildUpdate } from "../models/feywild"
import { StandardHarptos } from "../gameObjects/standardHarptos"
import { generateMockFeywild } from "../gameObjects/feyRandoms"
import { createLogger } from "../utils/logger"

const logger = createLogger('Database Layer')


export class HarptosDB {
    constructor(

    ){}

    createHarptos(harptosCalendar: HarptosCalendar){
        return harptosCalendar
    }

    retrieveHarptos(harptosID: string, userID: string): HarptosCalendar{
        return this.generateMockHarptos(harptosID, userID, 1, 1600)
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
        private table = process.env.FEYWILD_TABLE,
        /*private index = process.env.FEYWILD_INDEX*/
    ) {}

    async createFeywild(feywildCalendar: FeywildCalendar){
        const inputs = {
            TableName: this.table,
            Item: feywildCalendar
        }
        logger.info("*** Database Access Layer ***")
        logger.info(inputs)
        await this.documentClient.put(inputs).promise()
        logger.info("Item Created")
        return feywildCalendar
    }

    retrieveFeywild(feywildID: string, userID: string){
        return generateMockFeywild(feywildID, userID)
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
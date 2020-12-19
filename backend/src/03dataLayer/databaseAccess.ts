import { HarptosCalendar, HarptosUpdate } from "../models/harptos"
import { FeywildCalendar, FeywildUpdate } from "../models/feywild"
import { StandardHarptos } from "../gameObjects/standardHarptos"
import { generateMockFeywild } from "../gameObjects/feyRandoms"

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

    ) {}

    createFeywild(feywildCalendar: FeywildCalendar){
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
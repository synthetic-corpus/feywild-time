import { HarptosCalendar, HarptosUpdate } from "../models/harptos"
import { StandardHarptos } from "../gameObjects/standardHarptos"

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
            ...harptosUpdate
        }
        return updatedThing
    }

    generateMockHarptos(harptosID: string, userID: string, currentDay: number, year: number): HarptosCalendar {
        /* This function for testing only */
        const newCalendar: HarptosCalendar = {
            harptosID,
            userID,
            currentDay,
            year,
            days: StandardHarptos
        }
        return newCalendar
    }
}
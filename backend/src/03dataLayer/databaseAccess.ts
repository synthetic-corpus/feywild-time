import { HarptosCalendar } from "../models/harptos"
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

    generateMockHarptos(harptosID: string, userID: string, currentDay: number, year: number): HarptosCalendar {
        /* This function for testing only */
        const newCalendar: HarptosCalendar = {
            calenderID: harptosID,
            userID,
            currentDay,
            year,
            days: StandardHarptos
        }
        return newCalendar
    }
}
import { HarptosCalendar } from "../models/harptos"
import { StandardHarptos } from "../gameObjects/standardHarptos"

export class HarptosDB {
    constructor(

    ){}

    createHarptos(harptosCalendar: HarptosCalendar){
        return harptosCalendar
    }

    retrieveHarptos(harptosID: string, userID: string): HarptosCalendar{
        return this.generateMockHarptos(harptosID, userID)
    }

    generateMockHarptos(harptosID: string, userID: string): HarptosCalendar {
        const newCalendar: HarptosCalendar = {
            calenderID: harptosID,
            userID,
            currentDay: 1,
            year: 1600,
            days: StandardHarptos
        }
        return newCalendar
    }
}
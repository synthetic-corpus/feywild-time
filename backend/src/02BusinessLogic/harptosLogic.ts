import * as uuid from 'uuid'

import { StandardHarptos } from '../gameObjects/standardHarptos'
import { HarptosCalendar, HarptosUpdate } from '../models/Harptos'

/* Database Layer */
import { HarptosDB } from '../03dataLayer/databaseAccess'
const harptosDB = new HarptosDB()

/* Create Harptos */
export function createHarptos(
    currentDay:number,
    year: number, 
    userID:string): HarptosCalendar {
        const harptosID = uuid.v4()
        const newCalendar: HarptosCalendar = {
            harptosID,
            userID,
            currentDay,
            year,
            days: StandardHarptos
        }
        return harptosDB.createHarptos(newCalendar)
    }

export function retrieveHarptos(
    harptosID: string,
    userID: string
): HarptosCalendar {
    return harptosDB.retrieveHarptos(harptosID, userID)
}

export function updateHarptos(
    harptosUpdate: HarptosUpdate,
    harptosID: string,
    userID: string
): HarptosCalendar {
    return harptosDB.updateHarptos(harptosUpdate, harptosID, userID)
}

export function deleteHarptos(
    harptosID: string,
    userID: string
): Object {
    return harptosDB.deleteHarptos(harptosID, userID)
}
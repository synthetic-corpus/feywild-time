import * as uuid from 'uuid'

import { StandardHarptos } from '../gameObjects/standardHarptos'
import { HarptosCalendar, HarptosUpdate } from '../models/Harptos'

/* Database Layer */
import { HarptosDB } from '../03dataLayer/databaseAccess'
const harptosDB = new HarptosDB()
const createdAt = (new Date()).toString();

/* Create Harptos */
export async function createHarptos(
    currentDay:number,
    year: number, 
    userID:string): Promise<HarptosCalendar> {
        if(!currentDay){
            currentDay = 1
        }
        if(!year){
            year = 1500
        }
        const harptosID = uuid.v4()
        const newCalendar: HarptosCalendar = {
            createdAt,
            harptosID,
            userID,
            currentDay,
            year,
            days: StandardHarptos
        }
        return await harptosDB.createHarptos(newCalendar)
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
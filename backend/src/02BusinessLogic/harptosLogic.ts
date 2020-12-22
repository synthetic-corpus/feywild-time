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
    harptosYear: number, 
    userID:string): Promise<HarptosCalendar> {
        if(!currentDay){
            currentDay = 1
        }
        if(!harptosYear){
            harptosYear = 1500
        }
        const harptosID = uuid.v4()
        const newCalendar: HarptosCalendar = {
            createdAt,
            harptosID,
            userID,
            currentDay,
            harptosYear,
            days: StandardHarptos
        }
        return await harptosDB.createHarptos(newCalendar)
    }

export async function retrieveHarptos(
    harptosID: string,
    userID: string
): Promise<HarptosCalendar> {
    return await harptosDB.retrieveHarptos(harptosID, userID)
}

export async function updateHarptos(
    harptosUpdate: HarptosUpdate,
    harptosID: string,
    userID: string
): Promise<Object>{
    return await harptosDB.updateHarptos(harptosUpdate, harptosID, userID)
}

export async function deleteHarptos(
    harptosID: string,
    userID: string
): Promise<Object> {
    return await harptosDB.deleteHarptos(harptosID, userID)
}
import * as uuid from 'uuid'

import { FeywildCalendar, FeywildUpdate } from '../models/Feywild'
import { FeywildSetup } from '../requests/createFeywild'

/* Database Layer */
import { FeywildDB } from '../03dataLayer/databaseAccess'
const feywildDB = new FeywildDB

export function createFeywild(feywildSetup: FeywildSetup, userID: string): FeywildCalendar{
    const feywildID = uuid.v4()
    const createdAt = (new Date()).toString();
    const feyZone: FeywildCalendar = {
        userID,
        feywildID,
        createdAt,
        ...feywildSetup
    }
    return feywildDB.createFeywild(feyZone)
}

export function retrieveFeywild(feywildID: string, userID: string){
    return feywildDB.retrieveFeywild(feywildID, userID)
}

export function updateFeywild(feywildUpdate: FeywildUpdate, feywildID: string, userID: string){
    return feywildDB.updateFeywild(feywildUpdate, feywildID, userID)
}

export function deleteFeywild(feywildID, userID){
    return feywildDB.deleteFeywild(feywildID, userID)
}
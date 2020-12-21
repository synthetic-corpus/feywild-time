import * as uuid from 'uuid'

import { FeywildCalendar, FeywildUpdate } from '../models/Feywild'
import { FeywildSetup } from '../requests/createFeywild'
import { createLogger } from '../utils/logger'

const logger = createLogger('Logic Layer')
/* Database Layer */
import { FeywildDB } from '../03dataLayer/databaseAccess'
const feywildDB = new FeywildDB()

export async function createFeywild(feywildSetup: FeywildSetup, userID: string): Promise<FeywildCalendar>{
    const feywildID = uuid.v4()
    const createdAt = (new Date()).toString();
    logger.info("*** Logic Layer ***")
    logger.info(`Creating a FeyWild Calander at ${createdAt}`)
    const feyZone: FeywildCalendar = {
        userID,
        feywildID,
        createdAt,
        ...feywildSetup
    }
    return await feywildDB.createFeywild(feyZone)
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
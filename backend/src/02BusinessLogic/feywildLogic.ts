import * as uuid from 'uuid'

import { FeywildCalendar, FeywildUpdate } from '../models/Feywild'
import { FeywildSetup } from '../requests/createFeywild'
import { createLogger } from '../utils/logger'

const logger = createLogger('Logic Layer')
/* Database Layer */
import { FeywildDB } from '../03dataLayer/databaseAccess'
const feywildDB = new FeywildDB()

export async function createFeywild(
    feywildSetup: FeywildSetup, 
    userID: string
    ): Promise<FeywildCalendar>{
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

export async function retrieveFeywild(
    feywildID: string, 
    userID: string
    ): Promise<FeywildCalendar>{
    return await feywildDB.retrieveFeywild(feywildID, userID)
}

export async function updateFeywild(
    feywildUpdate: FeywildUpdate, 
    feywildID: string, 
    userID: string): Promise<Object>{
    return await feywildDB.updateFeywild(feywildUpdate, feywildID, userID)
}

export async function deleteFeywild(
    feywildID: string, 
    userID: string
    ): Promise<Object>{
    return await feywildDB.deleteFeywild(feywildID, userID)
}
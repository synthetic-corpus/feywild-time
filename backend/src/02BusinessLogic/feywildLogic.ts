import * as uuid from 'uuid'

import { FeywildCalendar, FeywildUpdate } from '../models/Feywild'
import { FeywildSetup } from '../requests/createFeywild'

/* Database Layer */
import { FeywildDB } from '../03dataLayer/databaseAccess'
const feywildDB = new FeywildDB

export function createFeywild(feywildSetup: FeywildSetup, userID: string): FeywildCalendar{
    const feywildID = uuid.v4()
    const feyZone: FeywildCalendar = {
        userID,
        feywildID,
        ...feywildSetup
    }
    return feywildDB.createFeywild(feyZone)
}
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
        const calenderID = uuid.v4()
        const newCalendar: HarptosCalendar = {
            calenderID,
            userID,
            currentDay,
            year,
            days: StandardHarptos
        }
        return harptosDB.createHarptos(newCalendar)
    }
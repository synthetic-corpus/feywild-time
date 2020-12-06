import * as _ from 'lodash'
import { HarptosDay } from '../models/harptos'
export const Harptos: HarptosDay[] = []

const dayNumbers = _.range(1,31)
const monthNames = [
    'Hammer',
    'Alturiak',
    'Ches',
    'Tarsakh',
    'Mirtul',
    'Kythorn',
    'Flamerule',
    'Eleasis',
    'Eleint',
    'Marpenoth',
    'Uktar',
    'Nightal'
]
monthNames.forEach(Name => {
    dayNumbers.forEach(dayNumber => {
        const day: HarptosDay = {
            month: Name,
            dayNumber: dayNumber,
            season: "unset" /* Will be set by another function */
        }
        Harptos.push(day)
    })
})
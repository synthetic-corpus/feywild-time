import { FeywildCalendar } from '../models/feywild'

export function generateMockFeywild(
    feywildID: string,
    userID: string
): FeywildCalendar {
    /* Used for testing. Returns a Random Default Calendar.*/
    const whichEver = Math.random() * (3 - 0) + 0
    const feyZone = options[whichEver]
    return {
        feywildID,
        userID,
        ...feyZone
    }
}

const options = [
    {
        feywildName: "Always Summer",
        dilation: {sides: 4, rolls: 1, add: 0},
        currentSegment: 0,
        segments: [
            {
                astronomics: "sunrise",
                weather: "Warm Summer",
                notes: ''
            },
            {
                astronomics: "mid day",
                weather: "Warm Summer",
                notes: ''
            },
            {
                astronomics: "sun set",
                weather: "Warm Summer",
                notes: ''
            },
        ]
    },
    {
        feywildName: "Fey Twilight",
        dilation: {sides: 4, rolls: 2, add: 0},
        currentSegment: 0,
        segments: [
            {
                astronomics: "twilight",
                weather: "Cool Evening",
                notes: ''
            },
            {
                astronomics: "night time",
                weather: "Cool Night",
                notes: ''
            },
            {
                astronomics: "moon rise",
                weather: "Cool Night",
                notes: ''
            },
            {
                astronomics: "twilight",
                weather: "Cool night",
                notes: 'Mushroom People come out and say hello.'
            },
        ]
    },
    {
        feywildName: "Always Winter",
        dilation: {sides: 1, rolls: 1, add: 0},
        currentSegment: 0,
        segments: [
            {
                astronomics: "Normal day-night cycle",
                weather: "Cold Winter",
                notes: ''
            },
        ]
    },
    {
        feywildName: "Always Party",
        dilation: {sides: 6, rolls: 1, add: 1},
        currentSegment: 0,
        segments: [
            {
                astronomics: "Sun Down",
                weather: "Pleasant Fall",
                notes: "Sun Goes down! It's time to party!"
            },
            {
                astronomics: "Dusk",
                weather: "Pleasant Fall",
                notes: "Autumn Flower Dryads come out and MC"
            },
            {
                astronomics: "Night",
                weather: "Cool fall Night",
                notes: "Fey Musicians get everyone to Dance"
            },
            {
                astronomics: "Moon Overhead",
                weather: "Cool Fall Night",
                notes: "Players must past charm check or never want to leave."
            },
            {
                astronomics: "Sun Rise",
                weather: "Brisk Fall Morning",
                notes: "The sun is rising! It's time to party!"
            },
            {
                astronomics: "Sun at Noon",
                weather: "Fall Day",
                notes: "Bonfires mysteriously reconstruct themselves.."
            },
        ]
    }
]
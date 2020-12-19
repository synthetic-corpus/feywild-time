export interface FeywildCalendar {
    createdAt: string,
    feywildID: string,
    feywildName: string,
    userID: string,
    dilation: Dilation,
    currentSegment: number,
    segments: FeywildSegment[]
}

export interface FeywildSegment {
    astronomics: string /* represents position of sun/moon or day/night */
    weather: string /* what season is the fey wild apparently in*/
    notes: string
}

export interface FeywildUpdate {
    feywildName: string,
    dilation?: Dilation,
    currentSegment: number,
    segments?: FeywildSegment[]
}

export interface Dilation {
    sides: number, // Sides on Dice
    rolls: number, // Number of rolls
    add: number // add to or subtract from total rolls e.g. 
}
/* For 24 hours in a Feywild area, a random amount of days will advance
in the Harptos Calendar. In games, randomization is done by dice.

In table top games, "2D6+1" means "Roll two six sided dice. Add their total and then add one".
In psuedo code that means Rand(1-6) + Rand(1-6) + 1 

*/
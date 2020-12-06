export interface FeywildCalendar {
    calenderID: string,
    userID: string,
    dilation: Dilation,
    currentSegment: number,
    segments: FeywildSegment[]
}

export interface FeywildSegment {
    astronmics: string /* represents position of sun/moon or day/night */
    weather: string /* what season is the fey wild apparently in*/
    notes: string
}

export interface FewildUpdate {
    dilation?: Dilation,
    currentSegment: number,
    segments?: FeywildSegment[]
}

export interface Dilation {
    sides: number,
    rolls: number,
    add: number
}
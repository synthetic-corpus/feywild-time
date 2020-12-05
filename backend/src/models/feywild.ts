export interface FeywildCalendar {
    calenderID: string,
    userID: string,
    dilation: Dilation,
    currentSegment: number,
    segments: FeywildSegment[]

}

export interface FeywildSegment {

}

export interface FewildUpdate {

}

export interface Dilation {
    sides: number,
    rolls: number,
    add: number
}
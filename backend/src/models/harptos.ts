export interface HarptosCalendar {
    calenderID: string,
    userID: string,
    currentDay: number,
    year: number,
    days: HarptosDay[]

}

export interface HarptosDay {
    month: string,
    day: number,
    notes: string
}

export interface HartposUpdate {
    currentDay: number,
    year: number,
    days?: HarptosDay[]
}
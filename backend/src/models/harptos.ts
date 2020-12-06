export interface HarptosCalendar {
    calenderID: string,
    userID: string,
    currentDay: number,
    year: number,
    days: HarptosDay[]

}

export interface HarptosDay {
    month: string,
    dayNumber: number,
    season: string,
    notes?: string
}

export interface HarptosUpdate {
    currentDay: number,
    year: number,
    days?: HarptosDay[]
}
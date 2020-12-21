
export interface HarptosCalendar {
    createdAt: string,
    harptosID: string,
    userID: string,
    currentDay: number,
    harptosYear: number,
    days: HarptosDay[]

}

export interface HarptosDay {
    month: string,
    dayNumber: number,
    season: string
}

/* Used by Logic Layer */
export interface HarptosUpdate {
    currentDay: number,
    harptosYear: number,
    days: HarptosDay[]
}
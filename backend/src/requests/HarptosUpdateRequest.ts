/* used by HTTP Layer */
import { HarptosDay } from "../models/harptos"
export interface HarptosUpdateRequest {
    currentDay: number
    year: number
    days: HarptosDay[]
}
/* used by HTTP Layer */
import { HarptosDay } from "../models/harptos"
export interface HarptosUpdateRequest {
    currentDay: number
    harptosYear: number
    days: HarptosDay[]
}
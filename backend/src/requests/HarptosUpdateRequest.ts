/* used by HTTP Layer */
import { HarptosDay } from "../models/harptos"
export interface HarptosUpdateRequest {
    day?: number
    year?: number
    days?: HarptosDay[]
}
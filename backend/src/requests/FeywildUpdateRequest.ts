/* used by HTTP Layer */
import { FeywildSegment, Dilation } from "../models/feywild"
export interface FeywildUpdateRequest {
    feywildName: string,
    dilation: Dilation,
    currentSegment: number,
    feySegments: FeywildSegment[]
}
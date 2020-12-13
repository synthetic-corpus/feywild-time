import {Dilation, FeywildSegment } from '../models/feywild'

export interface FeywildSetup {
    feywildName: string,
    dilation: Dilation,
    currentSegment: number,
    segments: FeywildSegment[]
}

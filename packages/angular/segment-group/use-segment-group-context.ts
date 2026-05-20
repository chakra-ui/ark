import { InjectionToken, inject } from '@angular/core'
import type { UseSegmentGroupReturn } from './use-segment-group'

export const ARK_SEGMENT_GROUP_CONTEXT = new InjectionToken<UseSegmentGroupReturn>('ARK_SEGMENT_GROUP_CONTEXT')

export function injectArkSegmentGroupContext(): UseSegmentGroupReturn {
  return inject(ARK_SEGMENT_GROUP_CONTEXT)
}

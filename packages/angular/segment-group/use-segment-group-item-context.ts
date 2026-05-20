import { InjectionToken, inject, type Signal } from '@angular/core'
import type { SegmentGroupItemProps, SegmentGroupItemState } from './segment-group.types'

export type UseSegmentGroupItemContext = Signal<SegmentGroupItemState>
export type UseSegmentGroupItemPropsContext = Signal<SegmentGroupItemProps>

export const ARK_SEGMENT_GROUP_ITEM_CONTEXT = new InjectionToken<UseSegmentGroupItemContext>(
  'ARK_SEGMENT_GROUP_ITEM_CONTEXT',
)
export const ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT = new InjectionToken<UseSegmentGroupItemPropsContext>(
  'ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT',
)

export function injectArkSegmentGroupItemContext(): UseSegmentGroupItemContext {
  const context = inject(ARK_SEGMENT_GROUP_ITEM_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_SEGMENT_GROUP_ITEM_CONTEXT not found: a segment group item context directive must be used inside an [arkSegmentGroupItem] directive.',
    )
  }
  return context
}

export function injectArkSegmentGroupItemPropsContext(): UseSegmentGroupItemPropsContext {
  const context = inject(ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT, { optional: true })
  if (!context) {
    throw new Error(
      'ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT not found: a segment group item part directive must be used inside an [arkSegmentGroupItem] directive.',
    )
  }
  return context
}

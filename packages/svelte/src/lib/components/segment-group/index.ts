export type { ValueChangeDetails as SegmentGroupValueChangeDetails } from '@zag-js/radio-group'
export { default as SegmentGroupContext, type SegmentGroupContextProps } from './segment-group-context.svelte'
export {
  default as SegmentGroupIndicator,
  type SegmentGroupIndicatorBaseProps,
  type SegmentGroupIndicatorProps,
} from './segment-group-indicator.svelte'
export {
  default as SegmentGroupItemContext,
  type SegmentGroupItemContextProps,
} from './segment-group-item-context.svelte'
export {
  default as SegmentGroupItemControl,
  type SegmentGroupItemControlBaseProps,
  type SegmentGroupItemControlProps,
} from './segment-group-item-control.svelte'
export {
  default as SegmentGroupItemHiddenInput,
  type SegmentGroupItemHiddenInputBaseProps,
  type SegmentGroupItemHiddenInputProps,
} from './segment-group-item-hidden-input.svelte'
export {
  default as SegmentGroupItemText,
  type SegmentGroupItemTextBaseProps,
  type SegmentGroupItemTextProps,
} from './segment-group-item-text.svelte'
export {
  default as SegmentGroupItem,
  type SegmentGroupItemBaseProps,
  type SegmentGroupItemProps,
} from './segment-group-item.svelte'
export {
  default as SegmentGroupLabel,
  type SegmentGroupLabelBaseProps,
  type SegmentGroupLabelProps,
} from './segment-group-label.svelte'
export {
  default as SegmentGroupRootProvider,
  type SegmentGroupRootProviderBaseProps,
  type SegmentGroupRootProviderProps,
} from './segment-group-root-provider.svelte'
export {
  default as SegmentGroupRoot,
  type SegmentGroupRootBaseProps,
  type SegmentGroupRootProps,
} from './segment-group-root.svelte'
export { segmentGroupAnatomy } from './segment-group.anatomy'
export { useSegmentGroup, type UseSegmentGroupProps, type UseSegmentGroupReturn } from './use-segment-group.svelte'
export { useSegmentGroupContext, type UseSegmentGroupContext } from './use-segment-group-context'
export { useSegmentGroupItemContext, type UseSegmentGroupItemContext } from './use-segment-group-item-context'

export * as SegmentGroup from './segment-group'

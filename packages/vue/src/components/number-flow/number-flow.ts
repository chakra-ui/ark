export type {
  AnimationDetails,
  ValueChangeDetails,
  TimingOptions,
  Trend,
  Segment,
  DigitSegment,
  SymbolSegment,
  DigitCell as DigitCellData,
} from '@zag-js/number-flow'
export {
  default as Root,
  type NumberFlowRootBaseProps as RootBaseProps,
  type NumberFlowRootProps as RootProps,
  type NumberFlowRootEmits as RootEmits,
} from './number-flow-root.vue'
export {
  default as RootProvider,
  type NumberFlowRootProviderBaseProps as RootProviderBaseProps,
  type NumberFlowRootProviderProps as RootProviderProps,
} from './number-flow-root-provider.vue'
export { default as Context, type NumberFlowContextProps as ContextProps } from './number-flow-context.vue'
export { default as Segments, type NumberFlowSegmentsProps as SegmentsProps } from './number-flow-segments.vue'
export {
  default as HiddenValueText,
  type NumberFlowHiddenValueTextBaseProps as HiddenValueTextBaseProps,
  type NumberFlowHiddenValueTextProps as HiddenValueTextProps,
} from './number-flow-hidden-value-text.vue'
export {
  default as Symbol,
  type NumberFlowSymbolBaseProps as SymbolBaseProps,
  type NumberFlowSymbolProps as SymbolProps,
} from './number-flow-symbol.vue'
export {
  default as Digit,
  type NumberFlowDigitBaseProps as DigitBaseProps,
  type NumberFlowDigitProps as DigitProps,
} from './number-flow-digit.vue'
export {
  default as DigitTrack,
  type NumberFlowDigitTrackBaseProps as DigitTrackBaseProps,
  type NumberFlowDigitTrackProps as DigitTrackProps,
} from './number-flow-digit-track.vue'
export {
  default as DigitCell,
  type NumberFlowDigitCellBaseProps as DigitCellBaseProps,
  type NumberFlowDigitCellProps as DigitCellProps,
} from './number-flow-digit-cell.vue'

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
  NumberFlowRoot as Root,
  type NumberFlowRootBaseProps as RootBaseProps,
  type NumberFlowRootProps as RootProps,
} from './number-flow-root.tsx'
export {
  NumberFlowRootProvider as RootProvider,
  type NumberFlowRootProviderBaseProps as RootProviderBaseProps,
  type NumberFlowRootProviderProps as RootProviderProps,
} from './number-flow-root-provider.tsx'
export { NumberFlowContext as Context, type NumberFlowContextProps as ContextProps } from './number-flow-context.tsx'
export {
  NumberFlowSegments as Segments,
  type NumberFlowSegmentsProps as SegmentsProps,
} from './number-flow-segments.tsx'
export {
  NumberFlowHiddenValueText as HiddenValueText,
  type NumberFlowHiddenValueTextBaseProps as HiddenValueTextBaseProps,
  type NumberFlowHiddenValueTextProps as HiddenValueTextProps,
} from './number-flow-hidden-value-text.tsx'
export {
  NumberFlowSymbol as Symbol,
  type NumberFlowSymbolBaseProps as SymbolBaseProps,
  type NumberFlowSymbolProps as SymbolProps,
} from './number-flow-symbol.tsx'
export {
  NumberFlowDigit as Digit,
  type NumberFlowDigitBaseProps as DigitBaseProps,
  type NumberFlowDigitProps as DigitProps,
} from './number-flow-digit.tsx'
export {
  NumberFlowDigitTrack as DigitTrack,
  type NumberFlowDigitTrackBaseProps as DigitTrackBaseProps,
  type NumberFlowDigitTrackProps as DigitTrackProps,
} from './number-flow-digit-track.tsx'
export {
  NumberFlowDigitCell as DigitCell,
  type NumberFlowDigitCellBaseProps as DigitCellBaseProps,
  type NumberFlowDigitCellProps as DigitCellProps,
} from './number-flow-digit-cell.tsx'

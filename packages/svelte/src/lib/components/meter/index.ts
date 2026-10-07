export type {
  IntlTranslations as MeterIntlTranslations,
  MeterValueState,
  ValueChangeDetails as MeterValueChangeDetails,
  ValueTranslationDetails as MeterValueTranslationDetails,
} from '@zag-js/meter'
export { default as MeterContext, type MeterContextProps } from './meter-context.svelte'
export {
  default as MeterIndicator,
  type MeterIndicatorBaseProps,
  type MeterIndicatorProps,
} from './meter-indicator.svelte'
export { default as MeterLabel, type MeterLabelBaseProps, type MeterLabelProps } from './meter-label.svelte'
export { default as MeterRoot, type MeterRootBaseProps, type MeterRootProps } from './meter-root.svelte'
export {
  default as MeterRootProvider,
  type MeterRootProviderBaseProps,
  type MeterRootProviderProps,
} from './meter-root-provider.svelte'
export { default as MeterTrack, type MeterTrackBaseProps, type MeterTrackProps } from './meter-track.svelte'
export {
  default as MeterValueText,
  type MeterValueTextBaseProps,
  type MeterValueTextProps,
} from './meter-value-text.svelte'
export { meterAnatomy } from './meter.anatomy.ts'
export { useMeterContext, type UseMeterContext } from './use-meter-context.ts'
export { useMeter, type UseMeterProps, type UseMeterReturn } from './use-meter.svelte.ts'

export * as Meter from './meter.ts'

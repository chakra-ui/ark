export type {
  IntlTranslations as MeterIntlTranslations,
  MeterValueState,
  ValueChangeDetails as MeterValueChangeDetails,
  ValueTranslationDetails as MeterValueTranslationDetails,
} from '@zag-js/meter'
export { default as MeterContext, type MeterContextProps } from './meter-context.vue'
export {
  default as MeterIndicator,
  type MeterIndicatorBaseProps,
  type MeterIndicatorProps,
} from './meter-indicator.vue'
export { default as MeterLabel, type MeterLabelBaseProps, type MeterLabelProps } from './meter-label.vue'
export {
  default as MeterRootProvider,
  type MeterRootProviderBaseProps,
  type MeterRootProviderProps,
} from './meter-root-provider.vue'
export {
  default as MeterRoot,
  type MeterRootBaseProps,
  type MeterRootProps,
  type MeterRootEmits,
} from './meter-root.vue'
export { default as MeterTrack, type MeterTrackBaseProps, type MeterTrackProps } from './meter-track.vue'
export {
  default as MeterValueText,
  type MeterValueTextBaseProps,
  type MeterValueTextProps,
} from './meter-value-text.vue'
export { meterAnatomy } from './meter.anatomy.ts'
export { useMeter, type UseMeterProps, type UseMeterReturn } from './use-meter.ts'
export { useMeterContext, type UseMeterContext } from './use-meter-context.ts'

export * as Meter from './meter.ts'

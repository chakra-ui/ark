import type { CheckedChangeDetails, CheckedState } from '@zag-js/checkbox'
import {
  CheckboxControl as Control,
  type CheckboxControlProps as ControlProps,
} from './checkbox-control'
import {
  CheckboxIndicator as Indicator,
  type CheckboxIndicatorProps as IndicatorProps,
} from './checkbox-indicator'
import { CheckboxLabel as Label, type CheckboxLabelProps as LabelProps } from './checkbox-label'
import { CheckboxRoot as Root, type CheckboxRootProps as RootProps } from './checkbox-root'

export { Control, Indicator, Label, Root }
export type {
  CheckedChangeDetails,
  CheckedState,
  ControlProps,
  IndicatorProps,
  LabelProps,
  RootProps,
}

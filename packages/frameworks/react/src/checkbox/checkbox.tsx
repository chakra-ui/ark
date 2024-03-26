import type { CheckedChangeDetails, CheckedState } from '@zag-js/checkbox'
import {
  CheckboxContext as Context,
  type CheckboxContextProps as ContextProps,
} from './checkbox-context'
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

export { Context, Control, Indicator, Label, Root }
export type {
  CheckedChangeDetails,
  CheckedState,
  ContextProps,
  ControlProps,
  IndicatorProps,
  LabelProps,
  RootProps,
}

import { type CopyStatusDetails } from '@zag-js/clipboard'
import {
  ClipboardControl as Control,
  type ClipboardControlProps as ControlProps,
} from './clipboard-control'
import {
  ClipboardIndicator as Indicator,
  type ClipboardIndicatorProps as IndicatorProps,
} from './clipboard-indicator'
import { ClipboardInput as Input, type ClipboardInputProps as InputProps } from './clipboard-input'
import { ClipboardLabel as Label, type ClipboardLabelProps as LabelProps } from './clipboard-label'
import { ClipboardRoot as Root, type ClipboardRootProps as RootProps } from './clipboard-root'
import {
  ClipboardTrigger as Trigger,
  type ClipboardTriggerProps as TriggerProps,
} from './clipboard-trigger'

export { Control, Indicator, Input, Label, Root, Trigger }
export type {
  ControlProps,
  CopyStatusDetails,
  IndicatorProps,
  InputProps,
  LabelProps,
  RootProps,
  TriggerProps,
}

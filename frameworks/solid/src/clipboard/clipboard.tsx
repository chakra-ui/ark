import type { CopyStatusDetails } from '@zag-js/clipboard'
import {
  ClipboardContext as Context,
  type ClipboardContextProps as ContextProps,
} from './clipboard-context'
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

export { Context, Control, Indicator, Input, Label, Root, Trigger }
export type {
  ContextProps,
  ControlProps,
  CopyStatusDetails,
  IndicatorProps,
  InputProps,
  LabelProps,
  RootProps,
  TriggerProps,
}

import { type CopyStatusDetails as ClipboardCopyStatusDetails } from '@zag-js/clipboard'
import { useClipboardContext, type ClipboardContext } from './clipboard-context'
import { ClipboardControl, type ClipboardControlProps } from './clipboard-control'
import { ClipboardIndicator, type ClipboardIndicatorProps } from './clipboard-indicator'
import { ClipboardInput, type ClipboardInputProps } from './clipboard-input'
import { ClipboardLabel, type ClipboardLabelProps } from './clipboard-label'
import { ClipboardRoot, type ClipboardRootProps } from './clipboard-root'
import { ClipboardTrigger, type ClipboardTriggerProps } from './clipboard-trigger'

export * as Clipboard from './clipboard'

export {
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRoot,
  ClipboardTrigger,
  useClipboardContext,
}

export type {
  ClipboardContext,
  ClipboardControlProps,
  ClipboardCopyStatusDetails,
  ClipboardIndicatorProps,
  ClipboardInputProps,
  ClipboardLabelProps,
  ClipboardRootProps,
  ClipboardTriggerProps,
}

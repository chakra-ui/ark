export type { CopyStatusDetails as ClipboardCopyStatusDetails } from '@zag-js/clipboard'
export { default as ClipboardContext, type ClipboardContextProps } from './clipboard-context.svelte'
export {
  default as ClipboardControl,
  type ClipboardControlBaseProps,
  type ClipboardControlProps,
} from './clipboard-control.svelte'
export {
  default as ClipboardIndicator,
  type ClipboardIndicatorBaseProps,
  type ClipboardIndicatorProps,
} from './clipboard-indicator.svelte'
export {
  default as ClipboardInput,
  type ClipboardInputBaseProps,
  type ClipboardInputProps,
} from './clipboard-input.svelte'
export {
  default as ClipboardLabel,
  type ClipboardLabelBaseProps,
  type ClipboardLabelProps,
} from './clipboard-label.svelte'
export {
  default as ClipboardRootProvider,
  type ClipboardRootProviderBaseProps,
  type ClipboardRootProviderProps,
} from './clipboard-root-provider.svelte'
export { default as ClipboardRoot, type ClipboardRootBaseProps, type ClipboardRootProps } from './clipboard-root.svelte'
export {
  default as ClipboardTrigger,
  type ClipboardTriggerBaseProps,
  type ClipboardTriggerProps,
} from './clipboard-trigger.svelte'
export {
  default as ClipboardValueText,
  type ClipboardValueTextBaseProps,
  type ClipboardValueTextProps,
} from './clipboard-value-text.svelte'
export { clipboardAnatomy } from './clipboard.anatomy'
export { ClipboardProvider, useClipboardContext } from './use-clipboard-context'
export type { UseClipboardContext } from './use-clipboard-context'
export { useClipboard } from './use-clipboard.svelte'
export type { UseClipboardProps, UseClipboardReturn } from './use-clipboard.svelte'

export * as Clipboard from './clipboard'

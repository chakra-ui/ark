export type { CopyStatusDetails as ClipboardCopyStatusDetails } from '@zag-js/clipboard'
export { default as ClipboardContext, type ClipboardContextProps } from './clipboard-context.vue'
export {
  default as ClipboardControl,
  type ClipboardControlBaseProps,
  type ClipboardControlProps,
} from './clipboard-control.vue'
export {
  default as ClipboardIndicator,
  type ClipboardIndicatorBaseProps,
  type ClipboardIndicatorProps,
} from './clipboard-indicator.vue'
export {
  default as ClipboardInput,
  type ClipboardInputBaseProps,
  type ClipboardInputProps,
} from './clipboard-input.vue'
export {
  default as ClipboardLabel,
  type ClipboardLabelBaseProps,
  type ClipboardLabelProps,
} from './clipboard-label.vue'
export {
  default as ClipboardRootProvider,
  type ClipboardRootProviderBaseProps,
  type ClipboardRootProviderProps,
} from './clipboard-root-provider.vue'
export {
  default as ClipboardRoot,
  type ClipboardRootBaseProps,
  type ClipboardRootEmits,
  type ClipboardRootProps,
} from './clipboard-root.vue'
export {
  default as ClipboardTrigger,
  type ClipboardTriggerBaseProps,
  type ClipboardTriggerProps,
} from './clipboard-trigger.vue'
export {
  default as ClipboardValueText,
  type ClipboardValueTextBaseProps,
  type ClipboardValueTextProps,
} from './clipboard-value-text.vue'
export { clipboardAnatomy } from './clipboard.anatomy'
export { useClipboard, type UseClipboardProps, type UseClipboardReturn } from './use-clipboard'
export { useClipboardContext, type UseClipboardContext } from './use-clipboard-context'

export * as Clipboard from './clipboard'

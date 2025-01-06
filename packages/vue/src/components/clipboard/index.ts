export type { CopyStatusDetails as ClipboardCopyStatusDetails } from '@zag-js/clipboard'
export { default as ClipboardContext, type ClipboardContextProps } from './clipboard-context.vue'
export {
  default as ClipboardControl,
  type ClipboardControlProps,
  type ClipboardControlBaseProps,
} from './clipboard-control.vue'
export {
  default as ClipboardIndicator,
  type ClipboardIndicatorProps,
  type ClipboardIndicatorBaseProps,
} from './clipboard-indicator.vue'
export {
  default as ClipboardInput,
  type ClipboardInputProps,
  type ClipboardInputBaseProps,
} from './clipboard-input.vue'
export {
  default as ClipboardLabel,
  type ClipboardLabelProps,
  type ClipboardLabelBaseProps,
} from './clipboard-label.vue'
export {
  default as ClipboardRootProvider,
  type ClipboardRootProviderProps,
  type ClipboardRootProviderBaseProps,
} from './clipboard-root-provider.vue'
export {
  default as ClipboardRoot,
  type ClipboardRootEmits,
  type ClipboardRootBaseProps,
  type ClipboardRootProps,
} from './clipboard-root.vue'
export {
  default as ClipboardTrigger,
  type ClipboardTriggerProps,
  type ClipboardTriggerBaseProps,
} from './clipboard-trigger.vue'
export {
  default as ClipboardValueText,
  type ClipboardValueTextProps,
  type ClipboardValueTextBaseProps,
} from './clipboard-value-text.vue'
export { useClipboard, type UseClipboardProps, type UseClipboardReturn } from './use-clipboard'
export { useClipboardContext, type UseClipboardContext } from './use-clipboard-context'
export { clipboardAnatomy } from './clipboard.anatomy'

export * as Clipboard from './clipboard'

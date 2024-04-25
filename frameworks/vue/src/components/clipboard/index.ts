export type { CopyStatusDetails as ClipboardCopyStatusDetails } from '@zag-js/clipboard'
export { default as ClipboardContext, type ClipboardContextProps } from './clipboard-context.vue'
export { default as ClipboardControl, type ClipboardControlProps } from './clipboard-control.vue'
export {
  default as ClipboardIndicator,
  type ClipboardIndicatorProps,
} from './clipboard-indicator.vue'
export { default as ClipboardInput, type ClipboardInputProps } from './clipboard-input.vue'
export { default as ClipboardLabel, type ClipboardLabelProps } from './clipboard-label.vue'
export {
  default as ClipboardRoot,
  type ClipboardRootProps,
  type ClipboardRootEmits,
} from './clipboard-root.vue'
export { default as ClipboardTrigger, type ClipboardTriggerProps } from './clipboard-trigger.vue'
export { type UseClipboardContext, useClipboardContext } from './use-clipboard-context'
export * as Clipboard from './clipboard'

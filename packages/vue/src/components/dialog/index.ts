export type { OpenChangeDetails as DialogOpenChangeDetails } from '@zag-js/dialog'
export {
  default as DialogBackdrop,
  type DialogBackdropBaseProps,
  type DialogBackdropProps,
} from './dialog-backdrop.vue'
export {
  default as DialogCloseTrigger,
  type DialogCloseTriggerBaseProps,
  type DialogCloseTriggerProps,
} from './dialog-close-trigger.vue'
export {
  default as DialogContent,
  type DialogContentBaseProps,
  type DialogContentProps,
} from './dialog-content.vue'
export { default as DialogContext, type DialogContextProps } from './dialog-context.vue'
export {
  default as DialogDescription,
  type DialogDescriptionBaseProps,
  type DialogDescriptionProps,
} from './dialog-description.vue'
export {
  default as DialogPositioner,
  type DialogPositionerBaseProps,
  type DialogPositionerProps,
} from './dialog-positioner.vue'
export {
  default as DialogRootProvider,
  type DialogRootProviderBaseProps,
  type DialogRootProviderProps,
} from './dialog-root-provider.vue'
export {
  default as DialogRoot,
  type DialogRootBaseProps,
  type DialogRootEmits,
  type DialogRootProps,
} from './dialog-root.vue'
export {
  default as DialogTitle,
  type DialogTitleBaseProps,
  type DialogTitleProps,
} from './dialog-title.vue'
export {
  default as DialogTrigger,
  type DialogTriggerBaseProps,
  type DialogTriggerProps,
} from './dialog-trigger.vue'
export { dialogAnatomy } from './dialog.anatomy'
export { useDialog, type UseDialogProps, type UseDialogReturn } from './use-dialog'
export { useDialogContext, type UseDialogContext } from './use-dialog-context'

export * as Dialog from './dialog'

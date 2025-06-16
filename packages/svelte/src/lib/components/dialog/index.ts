export type { OpenChangeDetails as DialogOpenChangeDetails } from '@zag-js/dialog'
export {
  default as DialogBackdrop,
  type DialogBackdropBaseProps,
  type DialogBackdropProps,
} from './dialog-backdrop.svelte'
export {
  default as DialogCloseTrigger,
  type DialogCloseTriggerBaseProps,
  type DialogCloseTriggerProps,
} from './dialog-close-trigger.svelte'
export { default as DialogContent, type DialogContentBaseProps, type DialogContentProps } from './dialog-content.svelte'
export { default as DialogContext, type DialogContextProps } from './dialog-context.svelte'
export {
  default as DialogDescription,
  type DialogDescriptionBaseProps,
  type DialogDescriptionProps,
} from './dialog-description.svelte'
export {
  default as Positioner,
  type DialogPositionerBaseProps,
  type DialogPositionerProps,
} from './dialog-positioner.svelte'
export { default as Root, type DialogRootBaseProps, type DialogRootProps } from './dialog-root.svelte'
export {
  default as RootProvider,
  type DialogRootProviderBaseProps,
  type DialogRootProviderProps,
} from './dialog-root-provider.svelte'
export { default as Title, type DialogTitleBaseProps, type DialogTitleProps } from './dialog-title.svelte'
export { default as Trigger, type DialogTriggerBaseProps, type DialogTriggerProps } from './dialog-trigger.svelte'
export { dialogAnatomy } from './dialog.anatomy'
export { useDialogContext } from './use-dialog-context'
export type { UseDialogContext } from './use-dialog-context'
export { useDialog } from './use-dialog.svelte'
export type { UseDialogProps, UseDialogReturn } from './use-dialog.svelte'

export * as Dialog from './dialog'

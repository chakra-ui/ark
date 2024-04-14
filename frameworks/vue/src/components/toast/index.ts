import { type CreateToasterProps, type CreateToasterReturn, createToaster } from './create-toaster'
import { ToastCloseTrigger, type ToastCloseTriggerProps } from './toast-close-trigger'
import { ToastDescription, type ToastDescriptionProps } from './toast-description'
import { ToastGroup, type ToastGroupProps } from './toast-group'
import { ToastRoot, type ToastRootProps } from './toast-root'
import { ToastTitle, type ToastTitleProps } from './toast-title'

export * as Toast from './toast'

export { ToastCloseTrigger, ToastDescription, ToastGroup, ToastRoot, ToastTitle, createToaster }

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastGroupProps,
  ToastRootProps,
  ToastTitleProps,
}

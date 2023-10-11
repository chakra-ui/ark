import { createToaster, type CreateToasterProps, type CreateToasterReturn } from './create-toaster'
import { Toast as ToastRoot, type ToastProps } from './toast'
import { ToastCloseTrigger, type ToastCloseTriggerProps } from './toast-close-trigger'
import { ToastDescription, type ToastDescriptionProps } from './toast-description'
import { ToastTitle, type ToastTitleProps } from './toast-title'

const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  CloseTrigger: ToastCloseTrigger,
})

export { createToaster, Toast, ToastCloseTrigger, ToastDescription, ToastTitle }

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastProps,
  ToastTitleProps,
}

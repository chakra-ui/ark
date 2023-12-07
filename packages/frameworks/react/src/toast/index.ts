import { createToaster, type CreateToasterProps, type CreateToasterReturn } from './create-toaster'
import { Toast as ToastRoot, type ToastProps } from './toast'
import { ToastCloseTrigger, type ToastCloseTriggerProps } from './toast-close-trigger'
import { ToastDescription, type ToastDescriptionProps } from './toast-description'
import { ToastGroup, type ToastGroupProps } from './toast-group'
import { ToastTitle, type ToastTitleProps } from './toast-title'

const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  CloseTrigger: ToastCloseTrigger,
  Description: ToastDescription,
  Group: ToastGroup,
  Title: ToastTitle,
})

export { createToaster, Toast, ToastCloseTrigger, ToastDescription, ToastGroup, ToastTitle }

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastGroupProps,
  ToastProps,
  ToastTitleProps,
}

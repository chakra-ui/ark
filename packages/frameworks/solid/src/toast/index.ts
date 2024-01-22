import { createToaster, type CreateToasterProps, type CreateToasterReturn } from './create-toaster'
import { ToastCloseTrigger, type ToastCloseTriggerProps } from './toast-close-trigger'
import { ToastDescription, type ToastDescriptionProps } from './toast-description'
import { ToastGroup, type ToastGroupProps } from './toast-group'
import { ToastRoot, type ToastRootProps } from './toast-root'
import { ToastTitle, type ToastTitleProps } from './toast-title'

export const Toast = {
  Root: ToastRoot,
  CloseTrigger: ToastCloseTrigger,
  Description: ToastDescription,
  Group: ToastGroup,
  Title: ToastTitle,
}

export { createToaster, ToastCloseTrigger, ToastDescription, ToastGroup, ToastRoot, ToastTitle }

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastGroupProps,
  ToastRootProps,
  ToastTitleProps,
}

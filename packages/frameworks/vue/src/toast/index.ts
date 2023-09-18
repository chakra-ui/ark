import { Toast as ToastRoot, type ToastProps } from './toast'
import { ToastCloseTrigger, type ToastCloseTriggerProps } from './toast-close-trigger'
import { ToastDescription, type ToastDescriptionProps } from './toast-description'
import { ToastGroup, type ToastGroupProps } from './toast-group'
import { useToastItemContext } from './toast-item-context'
import { ToastPlacements } from './toast-placements'
import { ToastProvider, useToast, type ToastProviderProps } from './toast-provider'
import { ToastTitle, type ToastTitleProps } from './toast-title'
import { toastAnatomy } from './toast.anatomy'

const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Title: ToastTitle,
  Root: ToastRoot,
  Description: ToastDescription,
  CloseTrigger: ToastCloseTrigger,
  Placements: ToastPlacements,
  Group: ToastGroup,
})

export {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastGroup,
  ToastPlacements,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  toastAnatomy,
  useToast,
  useToastItemContext,
}

export type {
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastGroupProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
}

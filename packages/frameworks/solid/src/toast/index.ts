import { Toast as ToastRoot, type ToastProps } from './toast'
import { ToastCloseTrigger, type ToastCloseTriggerProps } from './toast-close-trigger'
import { ToastDescription, type ToastDescriptionProps } from './toast-description'
import { ToastGroup, type ToastGroupProps } from './toast-group'
import { useToastItemContext, type ToastItemContext } from './toast-item-context'
import { ToastPlacements, type ToastPlacementsProps } from './toast-placements'
import { ToastProvider, useToast, type ToastProviderProps } from './toast-provider'
import { ToastTitle, type ToastTitleProps } from './toast-title'

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
  useToast,
  useToastItemContext,
}

export type {
  ToastCloseTriggerProps,
  ToastDescriptionProps,
  ToastGroupProps,
  ToastItemContext,
  ToastPlacementsProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
}

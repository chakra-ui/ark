import type { CallbackEvents } from '../../utils/events.js'
import type * as toast from '@zag-js/toast'
import type { RootElement } from '../../utils/define.js'
import './parts.js'
import './root.js'
import type { ToastContent, ToastTitle, ToastDescription, ToastActionTrigger, ToastCloseTrigger } from './parts.js'

export type { Api as ToastApi, GroupApi as ToasterApi, Options as ToastOptions } from '@zag-js/toast'
export { createToaster, type CreateToasterProps } from './shared.js'
export interface ToastElement extends RootElement<toast.Api, toast.Props> {}
export interface ToasterElement extends RootElement<toast.GroupApi> {
  toaster: toast.Store<string>
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-toaster': ToasterElement
    'ark-toast': ToastElement
    'ark-toast-content': InstanceType<typeof ToastContent>
    'ark-toast-title': InstanceType<typeof ToastTitle>
    'ark-toast-description': InstanceType<typeof ToastDescription>
    'ark-toast-action-trigger': InstanceType<typeof ToastActionTrigger>
    'ark-toast-close-trigger': InstanceType<typeof ToastCloseTrigger>
  }
}

export type ToastEventMap = CallbackEvents<toast.Props>

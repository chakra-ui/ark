import type { CallbackEvents } from '../../utils/events.js'
import type * as toast from '@zag-js/toast'
import type { RootElement } from '../../utils/define.js'
import './parts.js'
import './root.js'

export type { Api as ToastApi, GroupApi as ToasterApi, Options as ToastOptions } from '@zag-js/toast'
export { createToaster, type CreateToasterProps } from './shared.js'
export type ToastElement = RootElement<toast.Api, toast.Props>
export interface ToasterElement extends RootElement<toast.GroupApi> {
  toaster: toast.Store<string>
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-toaster': ToasterElement
    'ark-toast': ToastElement
  }
}

export type ToastEventMap = CallbackEvents<toast.Props>

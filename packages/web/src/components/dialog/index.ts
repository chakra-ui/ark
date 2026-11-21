import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/dialog'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from './parts.js'

export type { Api as DialogApi } from '@zag-js/dialog'
export interface DialogElement
  extends RootElement<Api, Props>, FunctionProperties<Props>, Pick<Props, 'ids'>, StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-dialog': DialogElement
    'ark-dialog-trigger': InstanceType<typeof DialogTrigger>
    'ark-dialog-backdrop': InstanceType<typeof DialogBackdrop>
    'ark-dialog-positioner': InstanceType<typeof DialogPositioner>
    'ark-dialog-close-trigger': InstanceType<typeof DialogCloseTrigger>
    'ark-dialog-content': InstanceType<typeof DialogContent>
    'ark-dialog-title': InstanceType<typeof DialogTitle>
    'ark-dialog-description': InstanceType<typeof DialogDescription>
  }
}

export type DialogEventMap = CallbackEvents<Props>

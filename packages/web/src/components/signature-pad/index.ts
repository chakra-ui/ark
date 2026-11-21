import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/signature-pad'
import type { ActionMethods, RootElement } from '../../utils/define.js'
import type {
  SignaturePadLabel,
  SignaturePadControl,
  SignaturePadSegment,
  SignaturePadGuide,
  SignaturePadClearTrigger,
  SignaturePadHiddenInput,
} from './parts.js'

export type { Api as SignaturePadApi, DataUrlType, DrawingOptions } from '@zag-js/signature-pad'
export interface SignaturePadElement
  extends ActionMethods<Api, 'clear'>, RootElement<Api, Props>, Pick<Props, 'ids' | 'translations' | 'drawing'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-signature-pad': SignaturePadElement
    'ark-signature-pad-label': InstanceType<typeof SignaturePadLabel>
    'ark-signature-pad-control': InstanceType<typeof SignaturePadControl>
    'ark-signature-pad-segment': InstanceType<typeof SignaturePadSegment>
    'ark-signature-pad-guide': InstanceType<typeof SignaturePadGuide>
    'ark-signature-pad-clear-trigger': InstanceType<typeof SignaturePadClearTrigger>
    'ark-signature-pad-hidden-input': InstanceType<typeof SignaturePadHiddenInput>
  }
}

export type SignaturePadEventMap = CallbackEvents<Props>

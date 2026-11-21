import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/qr-code'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type {
  Api as QrCodeApi,
  DownloadTriggerProps as QrCodeDownloadTriggerProps,
  QrCodeGenerateOptions,
  ValueChangeDetails as QrCodeValueChangeDetails,
} from '@zag-js/qr-code'
export interface QrCodeElement extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-qr-code': QrCodeElement
  }
}

export type QrCodeEventMap = CallbackEvents<Props>

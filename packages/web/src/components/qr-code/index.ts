import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/qr-code'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { QrCodeFrame, QrCodePattern, QrCodeOverlay, QrCodeDownloadTrigger } from './parts.js'

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
    'ark-qr-code-frame': InstanceType<typeof QrCodeFrame>
    'ark-qr-code-pattern': InstanceType<typeof QrCodePattern>
    'ark-qr-code-overlay': InstanceType<typeof QrCodeOverlay>
    'ark-qr-code-download-trigger': InstanceType<typeof QrCodeDownloadTrigger>
  }
}

export type QrCodeEventMap = CallbackEvents<Props>

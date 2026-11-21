import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/file-upload'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as FileUploadApi } from '@zag-js/file-upload'
export type FileUploadElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations' | 'acceptedFiles' | 'defaultAcceptedFiles'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-file-upload': FileUploadElement
  }
}

export type FileUploadEventMap = CallbackEvents<Props>

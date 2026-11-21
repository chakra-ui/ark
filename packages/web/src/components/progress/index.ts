import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/progress'
import type { RootElement } from '../../utils/define.js'

export type { Api as ProgressApi } from '@zag-js/progress'
export interface ProgressElement extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-progress': ProgressElement
  }
}

export type ProgressEventMap = CallbackEvents<Props>

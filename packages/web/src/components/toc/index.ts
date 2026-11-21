import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/toc'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as TocApi, ActiveChangeDetails as TocActiveChangeDetails, TocItem } from '@zag-js/toc'
export interface TocElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'items' | 'scrollEl'>, StateProperties<Props, 'activeIds'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-toc': TocElement
  }
}

export type TocEventMap = CallbackEvents<Props>

import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/collapsible'
import type { RootElement } from '../../utils/define.js'

export type { Api as CollapsibleApi } from '@zag-js/collapsible'
export type CollapsibleElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-collapsible': CollapsibleElement
  }
}

export type CollapsibleEventMap = CallbackEvents<Props>

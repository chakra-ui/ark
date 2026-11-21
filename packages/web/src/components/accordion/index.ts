import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/accordion'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as AccordionApi } from '@zag-js/accordion'
export type AccordionElement = RootElement<Api, Props> & Pick<Props, 'ids'> & StateProperties<Props, 'value'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-accordion': AccordionElement
  }
}

export type AccordionEventMap = CallbackEvents<Props>

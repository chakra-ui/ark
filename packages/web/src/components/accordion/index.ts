import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/accordion'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  AccordionItem,
  AccordionItemContent,
  AccordionItemHeader,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from './parts.js'

export type { Api as AccordionApi } from '@zag-js/accordion'
export interface AccordionElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-accordion': AccordionElement
    'ark-accordion-item': InstanceType<typeof AccordionItem>
    'ark-accordion-item-trigger': InstanceType<typeof AccordionItemTrigger>
    'ark-accordion-item-content': InstanceType<typeof AccordionItemContent>
    'ark-accordion-item-header': InstanceType<typeof AccordionItemHeader>
    'ark-accordion-item-indicator': InstanceType<typeof AccordionItemIndicator>
  }
}

export type AccordionEventMap = CallbackEvents<Props>

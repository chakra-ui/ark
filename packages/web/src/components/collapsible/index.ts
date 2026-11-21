import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/collapsible'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CollapsibleContent, CollapsibleIndicator, CollapsibleTrigger } from './parts.js'

export type { Api as CollapsibleApi } from '@zag-js/collapsible'
export interface CollapsibleElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-collapsible': CollapsibleElement
    'ark-collapsible-trigger': InstanceType<typeof CollapsibleTrigger>
    'ark-collapsible-content': InstanceType<typeof CollapsibleContent>
    'ark-collapsible-indicator': InstanceType<typeof CollapsibleIndicator>
  }
}

export type CollapsibleEventMap = CallbackEvents<Props>

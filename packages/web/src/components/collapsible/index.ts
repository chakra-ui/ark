import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/collapsible'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as CollapsibleApi } from '@zag-js/collapsible'
export interface CollapsibleElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-collapsible': CollapsibleElement
  }
}

export type CollapsibleEventMap = CallbackEvents<Props>

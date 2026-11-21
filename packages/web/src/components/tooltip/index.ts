import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tooltip'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as TooltipApi } from '@zag-js/tooltip'
export interface TooltipElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'positioning'>, StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-tooltip': TooltipElement
  }
}

export type TooltipEventMap = CallbackEvents<Props>

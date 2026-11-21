import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tooltip'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { TooltipArrow, TooltipArrowTip, TooltipContent, TooltipPositioner, TooltipTrigger } from './parts.js'

export type { Api as TooltipApi } from '@zag-js/tooltip'
export interface TooltipElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'positioning'>, StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-tooltip': TooltipElement
    'ark-tooltip-trigger': InstanceType<typeof TooltipTrigger>
    'ark-tooltip-positioner': InstanceType<typeof TooltipPositioner>
    'ark-tooltip-content': InstanceType<typeof TooltipContent>
    'ark-tooltip-arrow': InstanceType<typeof TooltipArrow>
    'ark-tooltip-arrow-tip': InstanceType<typeof TooltipArrowTip>
  }
}

export type TooltipEventMap = CallbackEvents<Props>

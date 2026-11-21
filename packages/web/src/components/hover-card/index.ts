import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/hover-card'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from './parts.js'

export type { Api as HoverCardApi } from '@zag-js/hover-card'
export interface HoverCardElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'positioning'>, StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-hover-card': HoverCardElement
    'ark-hover-card-trigger': InstanceType<typeof HoverCardTrigger>
    'ark-hover-card-positioner': InstanceType<typeof HoverCardPositioner>
    'ark-hover-card-content': InstanceType<typeof HoverCardContent>
    'ark-hover-card-arrow': InstanceType<typeof HoverCardArrow>
    'ark-hover-card-arrow-tip': InstanceType<typeof HoverCardArrowTip>
  }
}

export type HoverCardEventMap = CallbackEvents<Props>

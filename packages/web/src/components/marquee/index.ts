import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/marquee'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'

export type { Api as MarqueeApi, PauseStatusDetails as MarqueePauseStatusDetails } from '@zag-js/marquee'
export interface MarqueeElement
  extends
    ActionMethods<Api, 'restart'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'paused'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-marquee': MarqueeElement
  }
}

export type MarqueeEventMap = CallbackEvents<Props>

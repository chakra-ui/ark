import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/switch'
import type { RootElement } from '../../utils/define.js'

export type { Api as SwitchApi } from '@zag-js/switch'
export type SwitchElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-switch': SwitchElement
  }
}

export type SwitchEventMap = CallbackEvents<Props>

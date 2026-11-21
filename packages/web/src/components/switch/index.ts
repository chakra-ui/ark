import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/switch'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchThumb } from './parts.js'

export type { Api as SwitchApi } from '@zag-js/switch'
export interface SwitchElement extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'checked'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-switch': SwitchElement
    'ark-switch-hidden-input': InstanceType<typeof SwitchHiddenInput>
    'ark-switch-label': InstanceType<typeof SwitchLabel>
    'ark-switch-control': InstanceType<typeof SwitchControl>
    'ark-switch-thumb': InstanceType<typeof SwitchThumb>
  }
}

export type SwitchEventMap = CallbackEvents<Props>

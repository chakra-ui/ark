import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/toggle-group'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { ToggleGroupItem } from './parts.js'

export type { Api as ToggleGroupApi } from '@zag-js/toggle-group'
export interface ToggleGroupElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-toggle-group': ToggleGroupElement
    'ark-toggle-group-item': InstanceType<typeof ToggleGroupItem>
  }
}

export type ToggleGroupEventMap = CallbackEvents<Props>

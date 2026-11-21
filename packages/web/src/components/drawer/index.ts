import type { Api, Props } from '@zag-js/drawer'

import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'

export type { Api as DrawerApi, SnapPoint as DrawerSnapPoint } from '@zag-js/drawer'

export interface DrawerElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids'>,
    StateProperties<Props, 'open' | 'snapPoint'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-drawer': DrawerElement
  }
}

export type DrawerEventMap = CallbackEvents<Props>

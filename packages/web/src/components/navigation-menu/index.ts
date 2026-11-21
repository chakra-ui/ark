import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/navigation-menu'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type {
  Api as NavigationMenuApi,
  ValueChangeDetails as NavigationMenuValueChangeDetails,
} from '@zag-js/navigation-menu'
export interface NavigationMenuElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-navigation-menu': NavigationMenuElement
  }
}

export type NavigationMenuEventMap = CallbackEvents<Props>

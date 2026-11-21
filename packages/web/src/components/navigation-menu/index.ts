import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/navigation-menu'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuItemIndicator,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPositioner,
} from './parts.js'

export type {
  Api as NavigationMenuApi,
  ValueChangeDetails as NavigationMenuValueChangeDetails,
} from '@zag-js/navigation-menu'
export interface NavigationMenuElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-navigation-menu': NavigationMenuElement
    'ark-navigation-menu-list': InstanceType<typeof NavigationMenuList>
    'ark-navigation-menu-item': InstanceType<typeof NavigationMenuItem>
    'ark-navigation-menu-trigger': InstanceType<typeof NavigationMenuTrigger>
    'ark-navigation-menu-link': InstanceType<typeof NavigationMenuLink>
    'ark-navigation-menu-item-indicator': InstanceType<typeof NavigationMenuItemIndicator>
    'ark-navigation-menu-arrow': InstanceType<typeof NavigationMenuArrow>
    'ark-navigation-menu-indicator': InstanceType<typeof NavigationMenuIndicator>
    'ark-navigation-menu-viewport-positioner': InstanceType<typeof NavigationMenuViewportPositioner>
    'ark-navigation-menu-viewport': InstanceType<typeof NavigationMenuViewport>
    'ark-navigation-menu-content': InstanceType<typeof NavigationMenuContent>
  }
}

export type NavigationMenuEventMap = CallbackEvents<Props>

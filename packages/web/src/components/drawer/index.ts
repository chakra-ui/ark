import type { Api, Props } from '@zag-js/drawer'

import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type {
  DrawerTrigger,
  DrawerBackdrop,
  DrawerPositioner,
  DrawerContent,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerDescription,
  DrawerCloseTrigger,
} from './parts.js'

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
    'ark-drawer-trigger': InstanceType<typeof DrawerTrigger>
    'ark-drawer-backdrop': InstanceType<typeof DrawerBackdrop>
    'ark-drawer-positioner': InstanceType<typeof DrawerPositioner>
    'ark-drawer-content': InstanceType<typeof DrawerContent>
    'ark-drawer-grabber': InstanceType<typeof DrawerGrabber>
    'ark-drawer-grabber-indicator': InstanceType<typeof DrawerGrabberIndicator>
    'ark-drawer-swipe-area': InstanceType<typeof DrawerSwipeArea>
    'ark-drawer-title': InstanceType<typeof DrawerTitle>
    'ark-drawer-description': InstanceType<typeof DrawerDescription>
    'ark-drawer-close-trigger': InstanceType<typeof DrawerCloseTrigger>
  }
}

export type DrawerEventMap = CallbackEvents<Props>

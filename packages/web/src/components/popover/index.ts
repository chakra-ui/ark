import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/popover'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  PopoverAnchor,
  PopoverArrow,
  PopoverArrowTip,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverIndicator,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from './parts.js'

export type { Api as PopoverApi } from '@zag-js/popover'
export interface PopoverElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations' | 'positioning'>,
    StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-popover': PopoverElement
    'ark-popover-trigger': InstanceType<typeof PopoverTrigger>
    'ark-popover-positioner': InstanceType<typeof PopoverPositioner>
    'ark-popover-close-trigger': InstanceType<typeof PopoverCloseTrigger>
    'ark-popover-anchor': InstanceType<typeof PopoverAnchor>
    'ark-popover-indicator': InstanceType<typeof PopoverIndicator>
    'ark-popover-content': InstanceType<typeof PopoverContent>
    'ark-popover-arrow': InstanceType<typeof PopoverArrow>
    'ark-popover-arrow-tip': InstanceType<typeof PopoverArrowTip>
    'ark-popover-title': InstanceType<typeof PopoverTitle>
    'ark-popover-description': InstanceType<typeof PopoverDescription>
  }
}

export type PopoverEventMap = CallbackEvents<Props>

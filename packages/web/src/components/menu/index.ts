import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/menu'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  MenuArrow,
  MenuArrowTip,
  MenuCheckboxItem,
  MenuContent,
  MenuContextTrigger,
  MenuEmpty,
  MenuIndicator,
  MenuInput,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemIndicator,
  MenuItemText,
  MenuList,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from './parts.js'

export type { Api as MenuApi } from '@zag-js/menu'
export interface MenuElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'positioning'>,
    StateProperties<Props, 'open'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-menu': MenuElement
    'ark-menu-trigger': InstanceType<typeof MenuTrigger>
    'ark-menu-trigger-item': InstanceType<typeof MenuTriggerItem>
    'ark-menu-positioner': InstanceType<typeof MenuPositioner>
    'ark-menu-input': InstanceType<typeof MenuInput>
    'ark-menu-empty': InstanceType<typeof MenuEmpty>
    'ark-menu-item-group-label': InstanceType<typeof MenuItemGroupLabel>
    'ark-menu-context-trigger': InstanceType<typeof MenuContextTrigger>
    'ark-menu-indicator': InstanceType<typeof MenuIndicator>
    'ark-menu-content': InstanceType<typeof MenuContent>
    'ark-menu-arrow': InstanceType<typeof MenuArrow>
    'ark-menu-arrow-tip': InstanceType<typeof MenuArrowTip>
    'ark-menu-separator': InstanceType<typeof MenuSeparator>
    'ark-menu-item-group': InstanceType<typeof MenuItemGroup>
    'ark-menu-radio-item-group': InstanceType<typeof MenuRadioItemGroup>
    'ark-menu-list': InstanceType<typeof MenuList>
    'ark-menu-item': InstanceType<typeof MenuItem>
    'ark-menu-checkbox-item': InstanceType<typeof MenuCheckboxItem>
    'ark-menu-radio-item': InstanceType<typeof MenuRadioItem>
    'ark-menu-item-text': InstanceType<typeof MenuItemText>
    'ark-menu-item-indicator': InstanceType<typeof MenuItemIndicator>
  }
}

export type MenuEventMap = CallbackEvents<Props>

import { Menu as MenuRoot, type MenuProps } from './menu'
import { MenuArrow, type MenuArrowProps } from './menu-arrow'
import { MenuArrowTip, type MenuArrowTipProps } from './menu-arrow-tip'
import { MenuContent, type MenuContentProps } from './menu-content'
import { useMenuContext } from './menu-context'
import { MenuContextTrigger, type MenuContextTriggerProps } from './menu-context-trigger'
import { MenuItem, type MenuItemProps } from './menu-item'
import { MenuItemGroup, type MenuItemGroupProps } from './menu-item-group'
import { MenuItemGroupLabel, type MenuItemGroupLabelProps } from './menu-item-group-label'
import {
  MenuOptionItem,
  type MenuOptionItemProps,
  type MenuOptionItemState,
} from './menu-option-item'
import { MenuPositioner, type MenuPositionerProps } from './menu-positioner'
import { MenuSeparator, type MenuSeparatorProps } from './menu-separator'
import { MenuTrigger, type MenuTriggerProps } from './menu-trigger'
import { MenuTriggerItem, type MenuTriggerItemProps } from './menu-trigger-item'
import { menuAnatomy } from './menu.anatomy'

const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Arrow: MenuArrow,
  ArrowTip: MenuArrowTip,
  Content: MenuContent,
  ContextTrigger: MenuContextTrigger,
  Item: MenuItem,
  ItemGroup: MenuItemGroup,
  ItemGroupLabel: MenuItemGroupLabel,
  OptionItem: MenuOptionItem,
  Positioner: MenuPositioner,
  Separator: MenuSeparator,
  Trigger: MenuTrigger,
  TriggerItem: MenuTriggerItem,
})

export {
  Menu,
  MenuArrow,
  MenuArrowTip,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  menuAnatomy,
  useMenuContext,
}

export type {
  MenuArrowProps,
  MenuArrowTipProps,
  MenuContentProps,
  MenuContextTriggerProps,
  MenuItemGroupLabelProps,
  MenuItemGroupProps,
  MenuItemProps,
  MenuOptionItemProps,
  MenuOptionItemState,
  MenuPositionerProps,
  MenuProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
}

import { Menu as MenuRoot, type MenuProps } from './menu'
import { MenuArrow, type MenuArrowProps } from './menu-arrow'
import { MenuArrowTip, type MenuArrowTipProps } from './menu-arrow-tip'
import { MenuContent, type MenuContentProps } from './menu-content'
import { useMenuContext } from './menu-context'
import { MenuContextTrigger, type MenuContextTriggerProps } from './menu-context-trigger'
import { MenuIndicator, type MenuIndicatorProps } from './menu-indicator'
import { MenuItem, type MenuItemProps } from './menu-item'
import { MenuItemGroup, type MenuItemGroupProps } from './menu-item-group'
import { MenuItemGroupLabel, type MenuItemGroupLabelProps } from './menu-item-group-label'
import { MenuOptionItem, type MenuOptionItemProps } from './menu-option-item'
import { MenuPositioner, type MenuPositionerProps } from './menu-positioner'
import { MenuSeparator, type MenuSeparatorProps } from './menu-separator'
import { MenuTrigger, type MenuTriggerProps } from './menu-trigger'
import { MenuTriggerItem, type MenuTriggerItemProps } from './menu-trigger-item'

const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Arrow: MenuArrow,
  ArrowTip: MenuArrowTip,
  Content: MenuContent,
  ContextTrigger: MenuContextTrigger,
  Indicator: MenuIndicator,
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
  MenuIndicator,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  useMenuContext,
}

export type {
  MenuArrowProps,
  MenuArrowTipProps,
  MenuContentProps,
  MenuContextTriggerProps,
  MenuIndicatorProps,
  MenuItemGroupLabelProps,
  MenuItemGroupProps,
  MenuItemProps,
  MenuOptionItemProps,
  MenuPositionerProps,
  MenuProps,
  MenuSeparatorProps,
  MenuTriggerItemProps,
  MenuTriggerProps,
}

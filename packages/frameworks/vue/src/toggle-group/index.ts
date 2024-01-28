import type { ValueChangeDetails as ToggleGroupValueChangeDetails } from '@zag-js/toggle-group'
import { useToggleGroupContext, type ToggleGroupContext } from './toggle-group-context'
import { ToggleGroupItem, type ToggleGroupItemProps } from './toggle-group-item'
import { ToggleGroupRoot, type ToggleGroupRootProps } from './toggle-group-root'

export const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
}

export { ToggleGroupItem, ToggleGroupRoot, useToggleGroupContext }

export type {
  ToggleGroupContext,
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupValueChangeDetails,
}

import type { ValueChangeDetails as ToggleGroupValueChangeDetails } from '@zag-js/toggle-group'
import { ToggleGroup as ToggleGroupRoot, type ToggleGroupProps } from './toggle-group'
import { useToggleGroupContext, type ToggleGroupContext } from './toggle-group-context'
import { ToggleGroupItem, type ToggleGroupItemProps } from './toggle-group-item'

const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
})

export { ToggleGroup, ToggleGroupItem, useToggleGroupContext }

export type {
  ToggleGroupContext,
  ToggleGroupItemProps,
  ToggleGroupProps,
  ToggleGroupValueChangeDetails,
}

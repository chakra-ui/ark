import type { ValueChangeDetails as ToggleGroupValueChangeDetails } from '@zag-js/toggle-group'
import { type ToggleGroupContext, useToggleGroupContext } from './toggle-group-context'
import { ToggleGroupItem, type ToggleGroupItemProps } from './toggle-group-item'
import { ToggleGroupRoot, type ToggleGroupRootProps } from './toggle-group-root'

export * as ToggleGroup from './toggle-group'

export { ToggleGroupItem, ToggleGroupRoot, useToggleGroupContext }

export type {
  ToggleGroupContext,
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupValueChangeDetails,
}

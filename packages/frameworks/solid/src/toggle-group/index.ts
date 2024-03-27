import type { ValueChangeDetails as ToggleGroupValueChangeDetails } from '@zag-js/toggle-group'
import { ToggleGroupContext, type ToggleGroupContextProps } from './toggle-group-context'
import { ToggleGroupItem, type ToggleGroupItemProps } from './toggle-group-item'
import { ToggleGroupRoot, type ToggleGroupRootProps } from './toggle-group-root'
import { useToggleGroupContext, type UseToggleGroupContext } from './use-toggle-group-context'

export * as ToggleGroup from './toggle-group'

export { ToggleGroupContext, ToggleGroupItem, ToggleGroupRoot, useToggleGroupContext }

export type {
  ToggleGroupContextProps,
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupValueChangeDetails,
  UseToggleGroupContext,
}

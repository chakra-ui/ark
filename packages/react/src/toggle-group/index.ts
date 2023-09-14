import { Toggle, type ToggleProps } from './toggle'
import { ToggleGroup as ToggleGroupRoot, type ToggleGroupProps } from './toggle-group'
import { useToggleGroupContext, type ToggleGroupContext } from './toggle-group-context'
import { toggleGroupAnatomy } from './toggle-group.anatomy'

const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Toggle: Toggle,
})

export { Toggle, ToggleGroup, toggleGroupAnatomy, useToggleGroupContext }

export type { ToggleGroupContext, ToggleGroupProps, ToggleProps }

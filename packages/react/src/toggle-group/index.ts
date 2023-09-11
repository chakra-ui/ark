import { Toggle, type ToggleProps } from './toggle'
import { ToggleGroup as ToggleGroupRoot, type ToggleGroupProps } from './toggle-group'
import { useToggleGroupContext, type ToggleGroupContext } from './toggle-group-context'

const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
})

export { Toggle, ToggleGroup, useToggleGroupContext }

export type { ToggleGroupContext, ToggleGroupProps, ToggleProps }

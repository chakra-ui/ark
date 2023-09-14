import { Toggle, type ToggleProps } from './toggle'
import { ToggleGroup as ToggleGroupRoot, type ToggleGroupProps } from './toggle-group'

const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  Toggle: Toggle,
})

export { Toggle, ToggleGroup }

export type { ToggleGroupProps, ToggleProps }

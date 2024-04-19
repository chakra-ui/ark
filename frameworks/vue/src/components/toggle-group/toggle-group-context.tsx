import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseToggleGroupContext, useToggleGroupContext } from './use-toggle-group-context'

export type ToggleGroupContextProps = SlotsType<{
  default: UnwrapRef<UseToggleGroupContext>
}>

export const ToggleGroupContext = defineComponent(
  (_, { slots }) => {
    const togglegroup = useToggleGroupContext()

    return () => slots.default(togglegroup.value)
  },
  {
    name: 'ToggleGroupContext',
    slots: Object as ToggleGroupContextProps,
  },
)

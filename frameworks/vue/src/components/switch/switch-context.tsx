import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseSwitchContext, useSwitchContext } from './use-switch-context'

export type SwitchContextProps = SlotsType<{
  default: UnwrapRef<UseSwitchContext>
}>

export const SwitchContext = defineComponent(
  (_, { slots }) => {
    const context = useSwitchContext()

    return () => slots.default(context.value)
  },
  {
    name: 'SwitchContext',
    slots: Object as SwitchContextProps,
  },
)

import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseSelectContext, useSelectContext } from './use-select-context'

export type SelectContextProps = SlotsType<{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  default: UnwrapRef<UseSelectContext<any>>
}>

export const SelectContext = defineComponent(
  (_, { slots }) => {
    const select = useSelectContext()

    return () => slots.default(select.value)
  },
  {
    name: 'SelectContext',
    slots: Object as SelectContextProps,
  },
)

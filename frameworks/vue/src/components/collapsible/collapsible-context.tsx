import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseCollapsibleContext, useCollapsibleContext } from './use-collapsible-context'

export type CollapsibleContextProps = SlotsType<{
  default: UnwrapRef<UseCollapsibleContext>
}>

export const CollapsibleContext = defineComponent(
  (_, { slots }) => {
    const collapsible = useCollapsibleContext()

    return () => slots.default(collapsible.value)
  },
  {
    name: 'CollapsibleContext',
    slots: Object as CollapsibleContextProps,
  },
)

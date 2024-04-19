import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseTabsContext, useTabsContext } from './use-tabs-context'

export type TabsContextProps = SlotsType<{
  default: UnwrapRef<UseTabsContext>
}>

export const TabsContext = defineComponent(
  (_, { slots }) => {
    const tabs = useTabsContext()

    return () => slots.default(tabs.value)
  },
  {
    name: 'TabsContext',
    slots: Object as TabsContextProps,
  },
)

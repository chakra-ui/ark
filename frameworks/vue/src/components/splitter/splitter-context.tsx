import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseSplitterContext, useSplitterContext } from './use-splitter-context'

export type SplitterContextProps = SlotsType<{
  default: UnwrapRef<UseSplitterContext>
}>

export const SplitterContext = defineComponent(
  (_, { slots }) => {
    const splitter = useSplitterContext()

    return () => slots.default(splitter.value)
  },
  {
    name: 'SplitterContext',
    slots: Object as SplitterContextProps,
  },
)

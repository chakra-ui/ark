import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseProgressContext, useProgressContext } from './use-progress-context'

export type ProgressContextProps = SlotsType<{
  default: UnwrapRef<UseProgressContext>
}>

export const ProgressContext = defineComponent(
  (_, { slots }) => {
    const progress = useProgressContext()

    return () => slots.default(progress.value)
  },
  {
    name: 'ProgressContext',
    slots: Object as ProgressContextProps,
  },
)

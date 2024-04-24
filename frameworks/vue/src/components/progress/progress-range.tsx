import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressRangeProps extends HTMLArkProps<'div'> {}

export const ProgressRange = defineComponent<ProgressRangeProps>(
  (_, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      <ark.div {...api.value.rangeProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'ProgressRange',
  },
)

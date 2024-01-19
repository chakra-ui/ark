import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = defineComponent<ProgressCircleProps>(
  (_, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      <ark.svg {...api.value.circleProps} {...attrs}>
        {slots.default?.()}
      </ark.svg>
    )
  },
  {
    name: 'ProgressCircle',
  },
)

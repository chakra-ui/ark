import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange = defineComponent<ProgressCircleRangeProps>(
  (_, { attrs }) => {
    const api = useProgressContext()

    return () => <ark.circle {...api.value.circleRangeProps} {...attrs} />
  },
  {
    name: 'ProgressCircleRange',
  },
)

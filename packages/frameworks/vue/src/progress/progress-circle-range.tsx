import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange = defineComponent<ProgressCircleRangeProps>(
  (_, { attrs }) => {
    const api = useProgressContext()

    const style = {
      style: {
        cx: '50px',
        cy: '50px',
        r: '42px',
      },
    }

    return () => <ark.circle {...api.value.circleRangeProps} {...attrs} {...style} />
  },
  {
    name: 'ProgressCircleRange',
  },
)

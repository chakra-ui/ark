import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = defineComponent<ProgressCircleProps>(
  (_, { attrs }) => {
    const api = useProgressContext()

    return () => <ark.svg {...api.value.circleProps} {...attrs} />
  },
  {
    name: 'ProgressCircle',
  },
)

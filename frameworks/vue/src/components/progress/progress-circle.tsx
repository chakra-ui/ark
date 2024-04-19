import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = defineComponent<ProgressCircleProps>(
  (_, { slots, attrs }) => {
    const api = useProgressContext()

    return () => (
      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
      <ark.svg {...api.value.circleProps} {...attrs}>
        {slots.default?.()}
      </ark.svg>
    )
  },
  {
    name: 'ProgressCircle',
  },
)

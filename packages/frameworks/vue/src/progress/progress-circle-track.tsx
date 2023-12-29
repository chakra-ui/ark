import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = defineComponent<ProgressCircleTrackProps>(
  (_, { attrs }) => {
    const api = useProgressContext()

    const style = {
      style: {
        cx: '50px',
        cy: '50px',
        r: '42px',
      },
    }

    return () => <ark.circle {...api.value.circleTrackProps} {...attrs} {...style} />
  },
  {
    name: 'ProgressCircleTrack',
  },
)

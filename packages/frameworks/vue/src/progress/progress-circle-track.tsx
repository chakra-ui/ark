import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = defineComponent<ProgressCircleTrackProps>(
  (_, { attrs }) => {
    const api = useProgressContext()

    return () => <ark.circle {...api.value.circleTrackProps} {...attrs} />
  },
  {
    name: 'ProgressCircleTrack',
  },
)

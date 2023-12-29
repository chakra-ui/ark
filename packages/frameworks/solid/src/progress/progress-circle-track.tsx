import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleTrackProps, props, {
    style: {
      cx: '50px',
      cy: '50px',
      r: '42px',
    },
  })

  return <ark.circle {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleTrackProps, props)

  return <ark.circle {...mergedProps()} />
}

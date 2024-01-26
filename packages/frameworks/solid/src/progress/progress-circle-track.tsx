import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack: ArkComponent<'circle'> = (props: ProgressCircleTrackProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(() => api().circleTrackProps, props)

  return <ark.circle {...mergedProps} />
}

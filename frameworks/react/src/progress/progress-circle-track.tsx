import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleTrackProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.circleTrackProps, props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleTrack.displayName = 'ProgressCircleTrack'

import { mergeProps } from '@zag-js/react'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export type ProgressCircleTrackBaseProps = {}
export interface ProgressCircleTrackProps
  extends HTMLArkProps<'circle'>,
    ProgressCircleTrackBaseProps {}

export const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleTrackProps(), props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleTrack.displayName = 'ProgressCircleTrack'

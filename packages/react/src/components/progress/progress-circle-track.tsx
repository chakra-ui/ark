import { mergeProps } from '@zag-js/react'
import type { SVGProps } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleTrackBaseProps extends PolymorphicProps {}
export interface ProgressCircleTrackProps
  extends SVGProps<SVGCircleElement>,
    ProgressCircleTrackBaseProps {}

export const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleTrackProps(), props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleTrack.displayName = 'ProgressCircleTrack'

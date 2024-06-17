import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressTrackBaseProps extends PolymorphicProps {}
export interface ProgressTrackProps
  extends HTMLAttributes<HTMLDivElement>,
    ProgressTrackBaseProps {}

export const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getTrackProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ProgressTrack.displayName = 'ProgressTrack'

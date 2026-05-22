'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleTrackBaseProps extends PolymorphicProps {}
export interface ProgressCircleTrackProps extends HTMLProps<'circle'>, ProgressCircleTrackBaseProps {}

export const ProgressCircleTrack = ({ ref, ...props }: ProgressCircleTrackProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleTrackProps(), props)

  return <ark.circle ref={ref} {...mergedProps} />
}

ProgressCircleTrack.displayName = 'ProgressCircleTrack'

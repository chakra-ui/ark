'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleBaseProps extends PolymorphicProps {}
export interface ProgressCircleProps extends HTMLProps<'svg'>, ProgressCircleBaseProps {}

export const ProgressCircle = ({ ref, ...props }: ProgressCircleProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleProps(), props)

  return <ark.svg ref={ref} {...mergedProps} />
}

ProgressCircle.displayName = 'ProgressCircle'

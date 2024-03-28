import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const context = useProgressContext()
  const mergedProps = mergeProps(context.circleRangeProps, props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleRange.displayName = 'ProgressCircleRange'

import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const api = useProgressContext()
  const mergedProps = mergeProps(api.circleRangeProps, props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleRange.displayName = 'ProgressCircleRange'

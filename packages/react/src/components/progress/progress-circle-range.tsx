import { mergeProps } from '@zag-js/react'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleRangeProps extends HTMLArkProps<'circle'> {}

export const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleRangeProps(), props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleRange.displayName = 'ProgressCircleRange'

import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleProps extends HTMLArkProps<'svg'> {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.circleProps, props)

  return <ark.svg {...mergedProps} />
}

ProgressCircle.displayName = 'ProgressCircle'

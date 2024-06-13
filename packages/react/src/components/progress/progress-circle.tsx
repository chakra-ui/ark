import { mergeProps } from '@zag-js/react'
import { type HTMLArkProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export type ProgressCircleBaseProps = {}
export interface ProgressCircleProps extends HTMLArkProps<'svg'>, ProgressCircleBaseProps {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleProps(), props)

  return <ark.svg {...mergedProps} />
}

ProgressCircle.displayName = 'ProgressCircle'

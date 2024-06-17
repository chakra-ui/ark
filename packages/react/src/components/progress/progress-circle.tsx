import { mergeProps } from '@zag-js/react'
import type { SVGProps } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleBaseProps extends PolymorphicProps {}
export interface ProgressCircleProps extends SVGProps<SVGSVGElement>, ProgressCircleBaseProps {}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleProps(), props)

  return <ark.svg {...mergedProps} />
}

ProgressCircle.displayName = 'ProgressCircle'

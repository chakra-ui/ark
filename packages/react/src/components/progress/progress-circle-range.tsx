import { mergeProps } from '@zag-js/react'
import type { SVGProps } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleRangeBaseProps extends PolymorphicProps {}
export interface ProgressCircleRangeProps
  extends SVGProps<SVGCircleElement>,
    ProgressCircleRangeBaseProps {}

export const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getCircleRangeProps(), props)

  return <ark.circle {...mergedProps} />
}

ProgressCircleRange.displayName = 'ProgressCircleRange'

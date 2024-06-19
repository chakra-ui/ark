import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressCircleRangeBaseProps extends PolymorphicProps {}
export interface ProgressCircleRangeProps
  extends HTMLProps<'circle'>,
    ProgressCircleRangeBaseProps {}

export const ProgressCircleRange = forwardRef<SVGCircleElement, ProgressCircleRangeProps>(
  (props, ref) => {
    const progress = useProgressContext()
    const mergedProps = mergeProps(progress.getCircleRangeProps(), props)

    return <ark.circle ref={ref} {...mergedProps} />
  },
)

ProgressCircleRange.displayName = 'ProgressCircleRange'

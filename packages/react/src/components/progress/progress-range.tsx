import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressRangeBaseProps extends PolymorphicProps {}
export interface ProgressRangeProps
  extends HTMLAttributes<HTMLDivElement>,
    ProgressRangeBaseProps {}

export const ProgressRange = forwardRef<HTMLDivElement, ProgressRangeProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getRangeProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ProgressRange.displayName = 'ProgressRange'

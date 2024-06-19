import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressRangeBaseProps extends PolymorphicProps {}
export interface ProgressRangeProps extends HTMLProps<'div'>, ProgressRangeBaseProps {}

export const ProgressRange = forwardRef<HTMLDivElement, ProgressRangeProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.getRangeProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ProgressRange.displayName = 'ProgressRange'

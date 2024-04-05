import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressRangeProps extends HTMLArkProps<'div'> {}

export const ProgressRange = forwardRef<HTMLDivElement, ProgressRangeProps>((props, ref) => {
  const progress = useProgressContext()
  const mergedProps = mergeProps(progress.rangeProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

ProgressRange.displayName = 'ProgressRange'

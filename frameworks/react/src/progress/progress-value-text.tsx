import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './use-progress-context'

export interface ProgressValueTextProps extends HTMLArkProps<'span'> {}

export const ProgressValueText = forwardRef<HTMLSpanElement, ProgressValueTextProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const progress = useProgressContext()
    const mergedProps = mergeProps(progress.valueTextProps, rest)

    return (
      <ark.span {...mergedProps} ref={ref}>
        {children || progress.valueAsString}
      </ark.span>
    )
  },
)

ProgressValueText.displayName = 'ProgressValueText'

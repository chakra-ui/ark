import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useProgressContext } from './progress-context'

export interface ProgressValueTextProps extends HTMLArkProps<'span'> {}

export const ProgressValueText = forwardRef<HTMLSpanElement, ProgressValueTextProps>(
  (props, ref) => {
    const { children, ...rest } = props
    const api = useProgressContext()
    const mergedProps = mergeProps(api.valueTextProps, rest)

    return (
      <ark.span {...mergedProps} ref={ref}>
        {children || api.valueAsString}
      </ark.span>
    )
  },
)

ProgressValueText.displayName = 'ProgressValueText'

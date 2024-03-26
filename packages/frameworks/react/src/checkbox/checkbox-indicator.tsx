import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxIndicatorProps extends HTMLArkProps<'div'> {}

export const CheckboxIndicator = forwardRef<HTMLDivElement, CheckboxIndicatorProps>(
  (props, ref) => {
    const context = useCheckboxContext()
    const mergedProps = mergeProps(context.indicatorProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

CheckboxIndicator.displayName = 'CheckboxIndicator'

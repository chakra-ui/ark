import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxIndicatorProps extends HTMLArkProps<'div'> {
  indeterminate?: boolean
}

export const CheckboxIndicator = forwardRef<HTMLDivElement, CheckboxIndicatorProps>(
  (props, ref) => {
    const { indeterminate, ...rest } = props
    const checkbox = useCheckboxContext()
    const mergedProps = mergeProps(checkbox.getIndicatorProps(), rest)
    const isVisible = indeterminate ? checkbox.indeterminate : checkbox.checked

    return <ark.div {...mergedProps} hidden={!isVisible} ref={ref} />
  },
)

CheckboxIndicator.displayName = 'CheckboxIndicator'

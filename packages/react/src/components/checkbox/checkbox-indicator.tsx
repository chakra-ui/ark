import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxIndicatorBaseProps extends PolymorphicProps {
  indeterminate?: boolean
}
export interface CheckboxIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    CheckboxIndicatorBaseProps {}

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

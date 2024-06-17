import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxHiddenInputBaseProps extends PolymorphicProps {}
export interface CheckboxHiddenInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    CheckboxHiddenInputBaseProps {}

export const CheckboxHiddenInput = forwardRef<HTMLInputElement, CheckboxHiddenInputProps>(
  (props, ref) => {
    const checkbox = useCheckboxContext()
    const mergedProps = mergeProps(checkbox.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

CheckboxHiddenInput.displayName = 'CheckboxHiddenInput'

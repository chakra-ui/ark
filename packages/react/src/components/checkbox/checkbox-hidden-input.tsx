import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxHiddenInputBaseProps extends PolymorphicProps {}
export interface CheckboxHiddenInputProps
  extends HTMLProps<'input'>,
    CheckboxHiddenInputBaseProps {}

export const CheckboxHiddenInput = forwardRef<HTMLInputElement, CheckboxHiddenInputProps>(
  (props, ref) => {
    const checkbox = useCheckboxContext()
    const mergedProps = mergeProps(checkbox.getHiddenInputProps(), props)
    const field = useFieldContext()

    return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref} />
  },
)

CheckboxHiddenInput.displayName = 'CheckboxHiddenInput'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export type CheckboxHiddenInputBaseProps = {}
export interface CheckboxHiddenInputProps
  extends HTMLArkProps<'input'>,
    CheckboxHiddenInputBaseProps {}

export const CheckboxHiddenInput = forwardRef<HTMLInputElement, CheckboxHiddenInputProps>(
  (props, ref) => {
    const checkbox = useCheckboxContext()
    const mergedProps = mergeProps(checkbox.getHiddenInputProps(), props)

    return <ark.input {...mergedProps} ref={ref} />
  },
)

CheckboxHiddenInput.displayName = 'CheckboxHiddenInput'

import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxHiddenInputProps extends HTMLArkProps<'input'> {}

export const CheckboxHiddenInput = (props: CheckboxHiddenInputProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}

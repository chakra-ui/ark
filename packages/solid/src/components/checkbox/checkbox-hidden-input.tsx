import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxHiddenInputProps extends HTMLArkProps<'div'> {}

export const CheckboxHiddenInput = (props: CheckboxHiddenInputProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().hiddenInputProps, props)

  return <ark.input {...mergedProps} />
}

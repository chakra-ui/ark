import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCheckboxContext } from './use-checkbox-context'

export interface CheckboxHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface CheckboxHiddenInputProps
  extends HTMLProps<'input'>,
    CheckboxHiddenInputBaseProps {}

export const CheckboxHiddenInput = (props: CheckboxHiddenInputProps) => {
  const checkbox = useCheckboxContext()
  const mergedProps = mergeProps(() => checkbox().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}

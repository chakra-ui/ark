import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface RadioGroupItemHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    RadioGroupItemHiddenInputBaseProps {}

export const RadioGroupItemHiddenInput = (props: RadioGroupItemHiddenInputProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} />
}

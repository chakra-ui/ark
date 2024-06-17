import { mergeProps } from '@zag-js/react'
import { type InputHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps {}
export interface RadioGroupItemHiddenInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    RadioGroupItemHiddenInputBaseProps {}

export const RadioGroupItemHiddenInput = forwardRef<
  HTMLInputElement,
  RadioGroupItemHiddenInputProps
>((props, ref) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(radioGroup.getItemHiddenInputProps(itemProps), props)

  return <ark.input {...mergedProps} ref={ref} />
})

RadioGroupItemHiddenInput.displayName = 'RadioGroupItemHiddenInput'

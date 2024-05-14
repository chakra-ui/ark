import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

export interface RadioGroupItemTextProps extends HTMLArkProps<'span'> {}

export const RadioGroupItemText = (props: RadioGroupItemTextProps) => {
  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => radioGroup().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}

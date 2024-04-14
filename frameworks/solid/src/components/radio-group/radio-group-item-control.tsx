import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useRadioGroupContext } from './use-radio-group-context'
import { useRadioGroupItemPropsContext } from './use-radio-group-item-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl = (props: RadioGroupItemControlProps) => {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemControlProps(itemProps), props)

  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().getItemHiddenInputProps(itemProps)} />
    </>
  )
}

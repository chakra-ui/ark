import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useRadioGroupContext } from './radio-group-context'
import { useRadioGroupItemContext } from './radio-group-item-context'

export interface RadioGroupItemControlProps extends HTMLArkProps<'div'> {}

export const RadioGroupItemControl: ArkComponent<'div'> = (props: RadioGroupItemControlProps) => {
  const api = useRadioGroupContext()
  const itemProps = useRadioGroupItemContext()
  const mergedProps = mergeProps(() => api().getItemControlProps(itemProps), props)

  return (
    <>
      <ark.div {...mergedProps} />
      <input {...api().getItemHiddenInputProps(itemProps)} />
    </>
  )
}

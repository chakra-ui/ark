import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useComboboxContext } from './use-combobox-context'
import { useComboboxItemPropsContext } from './use-combobox-item-context'

export interface ComboboxItemIndicatorProps extends HTMLArkProps<'div'> {}

export const ComboboxItemIndicator = (props: ComboboxItemIndicatorProps) => {
  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = mergeProps(() => combobox().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}

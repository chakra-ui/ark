import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'
import { useComboboxItemContext } from './combobox-item-context'

export interface ComboboxItemIndicatorProps extends HTMLArkProps<'div'> {}

export const ComboboxItemIndicator: ArkComponent<'div'> = (props: ComboboxItemIndicatorProps) => {
  const combobox = useComboboxContext()
  const itemProps = useComboboxItemContext()
  const mergedProps = mergeProps(() => combobox().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}

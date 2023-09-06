import type { ItemProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './combobox-context'

export type ComboboxItemProps = Assign<HTMLArkProps<'div'>, ItemProps>

export const ComboboxItem = (props: ComboboxItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}

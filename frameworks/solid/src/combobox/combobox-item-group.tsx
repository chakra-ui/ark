import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxItemGroupProps extends Assign<HTMLArkProps<'div'>, ItemGroupProps> {}

export const ComboboxItemGroup = (props: ComboboxItemGroupProps) => {
  const [groupProps, localProps] = createSplitProps<ItemGroupProps>()(props, ['id'])
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().getItemGroupProps(groupProps), localProps)

  return <ark.div {...mergedProps()} />
}

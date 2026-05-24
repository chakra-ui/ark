import type { ItemProps } from '@zag-js/listbox'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useListboxContext } from './use-listbox-context.ts'
import { ListboxItemProvider } from './use-listbox-item-context.ts'
import { ListboxItemPropsProvider } from './use-listbox-item-props-context.ts'

export interface ListboxItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface ListboxItemProps extends HTMLProps<'div'>, ListboxItemBaseProps {}

export const ListboxItem = (props: ListboxItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'highlightOnHover'])
  const listbox = useListboxContext()
  const mergedProps = mergeProps(() => listbox().getItemProps(itemProps), localProps)
  const itemState = () => listbox().getItemState(itemProps)

  return (
    <ListboxItemPropsProvider value={itemProps}>
      <ListboxItemProvider value={itemState()}>
        <ark.div {...mergedProps} />
      </ListboxItemProvider>
    </ListboxItemPropsProvider>
  )
}

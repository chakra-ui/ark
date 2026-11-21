import type { ItemProps, ItemState } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { CommandItemProvider } from './use-command-item-context.ts'
import { CommandItemPropsProvider } from './use-command-item-props-context.ts'

export interface CommandItemState extends ItemState {}

export interface CommandItemBaseProps extends ItemProps, PolymorphicProps<'div', CommandItemState> {}
export interface CommandItemProps extends HTMLProps<'div'>, CommandItemBaseProps {}

export const CommandItem = (props: CommandItemProps) => {
  const [_itemProps, localProps] = createSplitProps<ItemProps>()(props, ['item', 'persistFocus'])
  const itemProps = mergeProps({ persistFocus: true }, _itemProps) as ItemProps
  const command = useCommandContext()
  const itemState = createMemo(() => command().getItemState(itemProps))
  const mergedProps = mergeProps(
    () => command().getItemProps(itemProps),
    parts.item.attrs(''),
    () => ({ hidden: !command().collection.has(itemState().value) }),
    localProps,
  )

  return (
    <CommandItemPropsProvider value={itemProps}>
      <CommandItemProvider value={itemState}>
        <ark.div {...mergedProps} state={itemState()} />
      </CommandItemProvider>
    </CommandItemPropsProvider>
  )
}

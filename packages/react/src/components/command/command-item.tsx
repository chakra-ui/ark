'use client'

import type { ItemProps, ItemState } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { CommandItemProvider } from './use-command-item-context.ts'
import { CommandItemPropsProvider } from './use-command-item-props-context.ts'

export interface CommandItemState extends ItemState {}

export interface CommandItemBaseProps extends ItemProps, PolymorphicProps<CommandItemState> {}
export interface CommandItemProps extends HTMLProps<'div'>, CommandItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>((props, ref) => {
  const [_itemProps, localProps] = splitItemProps(props, ['item', 'persistFocus'])
  const itemProps = { persistFocus: true, ..._itemProps }
  const command = useCommandContext()
  const itemState = command.getItemState(itemProps)
  const mergedProps = mergeProps(
    command.getItemProps(itemProps),
    parts.item.attrs(''),
    { hidden: !command.collection.has(itemState.value) },
    localProps,
  )

  return (
    <CommandItemPropsProvider value={itemProps}>
      <CommandItemProvider value={itemState}>
        <ark.div {...mergedProps} ref={ref} state={itemState} />
      </CommandItemProvider>
    </CommandItemPropsProvider>
  )
})

CommandItem.displayName = 'CommandItem'

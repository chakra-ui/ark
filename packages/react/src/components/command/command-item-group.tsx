'use client'

import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { CommandItemGroupPropsProvider } from './use-command-item-group-props-context.ts'

export interface CommandItemGroupBaseProps extends PolymorphicProps {}
export interface CommandItemGroupProps extends HTMLProps<'div'>, CommandItemGroupBaseProps {}

const splitItemGroupProps = createSplitProps<Partial<ItemGroupProps>>()

export const CommandItemGroup = forwardRef<HTMLDivElement, CommandItemGroupProps>((props, ref) => {
  const id = useId()
  const [_itemGroupProps, localProps] = splitItemGroupProps(props, ['id'])
  const itemGroupProps = { id, ..._itemGroupProps }

  const command = useCommandContext()
  const mergedProps = mergeProps(command.getItemGroupProps(itemGroupProps), parts.itemGroup.attrs(''), localProps)

  return (
    <CommandItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} ref={ref} />
    </CommandItemGroupPropsProvider>
  )
})

CommandItemGroup.displayName = 'CommandItemGroup'

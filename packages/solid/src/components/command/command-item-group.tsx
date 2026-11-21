import type { ItemGroupProps } from '@zag-js/combobox'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { CommandItemGroupPropsProvider } from './use-command-item-group-props-context.ts'

export interface CommandItemGroupBaseProps extends PolymorphicProps<'div'> {}
export interface CommandItemGroupProps extends HTMLProps<'div'>, CommandItemGroupBaseProps {}

export const CommandItemGroup = (props: CommandItemGroupProps) => {
  const [_itemGroupProps, localProps] = createSplitProps<Partial<ItemGroupProps>>()(props, ['id'])
  const command = useCommandContext()
  const itemGroupProps = mergeProps({ id: createUniqueId() }, _itemGroupProps)
  const mergedProps = mergeProps(
    () => command().getItemGroupProps(itemGroupProps),
    parts.itemGroup.attrs(''),
    localProps,
  )

  return (
    <CommandItemGroupPropsProvider value={itemGroupProps}>
      <ark.div {...mergedProps} />
    </CommandItemGroupPropsProvider>
  )
}

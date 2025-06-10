import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createEffect, createMemo, onCleanup } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'
import { MenuItemPropsProvider } from './use-menu-option-item-props-context'

interface ItemBaseProps extends ItemProps {
  /**
   * The function to call when the item is selected
   */
  onSelect?: VoidFunction
}

export interface MenuItemBaseProps extends ItemBaseProps, PolymorphicProps<'div'> {}
export interface MenuItemProps extends Assign<HTMLProps<'div'>, MenuItemBaseProps> {}

export const MenuItem = (props: MenuItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemBaseProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
    'onSelect',
  ])
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getItemProps(itemProps), localProps)
  const itemState = createMemo(() => context().getItemState(itemProps))

  createEffect(() => {
    const cleanup = context().addItemListener({ id: itemState().id, onSelect: itemProps.onSelect })
    onCleanup(() => cleanup?.())
  })

  return (
    <MenuItemPropsProvider value={itemProps}>
      <MenuItemProvider value={itemState}>
        <ark.div {...mergedProps} />
      </MenuItemProvider>
    </MenuItemPropsProvider>
  )
}

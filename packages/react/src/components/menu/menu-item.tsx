import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useEffect } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

interface ItemBaseProps extends ItemProps {
  /**
   * The function to call when the item is selected
   */
  onSelect?: VoidFunction
}

export interface MenuItemBaseProps extends ItemBaseProps, PolymorphicProps {}

export interface MenuItemProps extends Assign<HTMLProps<'div'>, MenuItemBaseProps> {}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemBaseProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
    'onSelect',
  ])

  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getItemProps(itemProps), localProps)
  const itemState = menu.getItemState(itemProps)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return menu.addItemListener({ id: itemState.id, onSelect: itemProps.onSelect })
  }, [itemState.id, itemProps.onSelect])

  return (
    <MenuItemProvider value={itemState}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemProvider>
  )
})

MenuItem.displayName = 'MenuItem'

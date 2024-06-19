import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

export interface MenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface MenuItemProps extends HTMLProps<'div'>, MenuItemBaseProps {}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])

  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getItemProps(itemProps), localProps)
  const itemState = menu.getItemState(itemProps)

  return (
    <MenuItemProvider value={itemState}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemProvider>
  )
})

MenuItem.displayName = 'MenuItem'

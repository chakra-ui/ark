import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { MenuItemProvider } from './use-menu-item-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

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

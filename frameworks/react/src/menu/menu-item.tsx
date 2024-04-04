import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
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

  const context = useMenuContext()
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)
  const itemState = context.getItemState(itemProps)

  return (
    <MenuItemProvider value={itemState}>
      <ark.div {...mergedProps} ref={ref} />
    </MenuItemProvider>
  )
})

MenuItem.displayName = 'MenuItem'

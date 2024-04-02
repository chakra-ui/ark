import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './use-menu-context'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const [menuItemProps, localProps] = createSplitProps<ItemProps>()(props, [
    'closeOnSelect',
    'disabled',
    'value',
    'valueText',
  ])

  const context = useMenuContext()
  const mergedProps = mergeProps(context.getItemProps(menuItemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItem.displayName = 'MenuItem'

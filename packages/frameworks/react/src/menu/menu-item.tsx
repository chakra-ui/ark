import type { ItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const [menuItemProps, buttonProps] = createSplitProps<ItemProps>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])

  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.getItemProps(menuItemProps) ?? {}, buttonProps)

  console.log(mergedProps)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItem.displayName = 'MenuItem'

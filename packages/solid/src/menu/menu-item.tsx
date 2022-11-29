import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuItemParams = Parameters<ReturnType<UseMenuReturn>['api']['getItemProps']>[0]

export type MenuItemProps = Assign<HTMLArkProps<'div'>, MenuItemParams>

export const MenuItem = (props: MenuItemProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']
  const [menuItemProps, divProps] = createSplitProps<MenuItemParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])
  return <ark.div {...api?.().getItemProps(menuItemProps)} {...divProps} />
}

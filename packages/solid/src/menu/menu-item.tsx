import { type Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemParams = Parameters<ReturnType<ReturnType<UseMenuReturn>['api']>['getItemProps']>[0]

export type MenuItemProps = Assign<HTMLArkProps<'div'>, MenuItemParams>

export const MenuItem = (props: MenuItemProps) => {
  const menu = useMenuContext()
  const [menuItemProps, divProps] = createSplitProps<MenuItemParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])
  return <ark.div {...menu?.().getItemProps(menuItemProps)} {...divProps} />
}

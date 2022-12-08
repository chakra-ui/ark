import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuItemGroupParams = Parameters<
  ReturnType<ReturnType<UseMenuReturn>['api']>['getGroupProps']
>[0]
export type MenuItemGroupProps = Assign<HTMLArkProps<'div'>, MenuItemGroupParams>

export const MenuItemGroup = (props: MenuItemGroupProps) => {
  const menu = useMenuContext()
  const [menuGroupProps, divProps] = createSplitProps<MenuItemGroupParams>()(props, ['id'])
  return <ark.div {...menu?.()?.getGroupProps(menuGroupProps)} {...divProps} />
}

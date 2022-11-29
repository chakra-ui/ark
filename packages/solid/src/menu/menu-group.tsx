import type { Assign } from '@polymorphic-factory/solid'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuGroupParams = Parameters<ReturnType<UseMenuReturn>['api']['getGroupProps']>[0]
export type MenuGroupProps = Assign<HTMLArkProps<'div'>, MenuGroupParams>

export const MenuGroup = (props: MenuGroupProps) => {
  const api = useMenuContext() as () => ReturnType<UseMenuReturn>['api']
  const [menuGroupProps, divProps] = createSplitProps<MenuGroupParams>()(props, ['id'])
  return <ark.div {...api?.()?.getGroupProps(menuGroupProps)} {...divProps} />
}

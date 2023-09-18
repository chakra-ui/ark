import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemGroupParams = Parameters<
  ReturnType<ReturnType<UseMenuReturn>['api']>['getItemGroupProps']
>[0]

export type MenuItemGroupProps = Assign<HTMLArkProps<'div'>, MenuItemGroupParams>

export const MenuItemGroup = (props: MenuItemGroupProps) => {
  const menu = useMenuContext()

  const [itemGroupProps, localProps] = createSplitProps<MenuItemGroupParams>()(props, ['id'])

  const groupProps = mergeProps(() => menu?.().getItemGroupProps(itemGroupProps), localProps)

  return <ark.div {...groupProps} />
}

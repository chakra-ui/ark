import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemParams = Parameters<ReturnType<ReturnType<UseMenuReturn>['api']>['getItemProps']>[0]

export type MenuItemProps = Assign<HTMLArkProps<'div'>, MenuItemParams>

export const MenuItem = (props: MenuItemProps) => {
  const menu = useMenuContext()

  const [itemParams, restProps] = createSplitProps<MenuItemParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])

  const itemProps = mergeProps(() => menu?.().getItemProps(itemParams), restProps)

  return <ark.div {...itemProps} />
}

import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

type MenuItemGroupParams = Parameters<UseMenuReturn['api']['getGroupProps']>[0]
export type MenuItemGroupProps = Assign<HTMLArkProps<'div'>, MenuItemGroupParams>

export const MenuItemGroup = forwardRef<'div', MenuItemGroupProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [menuGroupProps, divProps] = createSplitProps<MenuItemGroupParams>()(props, ['id'])
  const mergedProps = mergeProps(api?.getGroupProps(menuGroupProps) ?? {}, divProps)
  return <ark.div {...mergedProps} ref={ref} />
})

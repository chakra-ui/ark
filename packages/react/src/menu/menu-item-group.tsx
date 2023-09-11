import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemGroupParams = Parameters<UseMenuReturn['api']['getItemGroupProps']>[0]
export type MenuItemGroupProps = Assign<HTMLArkProps<'div'>, MenuItemGroupParams>

export const MenuItemGroup = forwardRef<HTMLDivElement, MenuItemGroupProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [itemGroupProps, divProps] = createSplitProps<MenuItemGroupParams>()(props, ['id'])
  const mergedProps = mergeProps(api?.getItemGroupProps(itemGroupProps) ?? {}, divProps)
  return <ark.div {...mergedProps} ref={ref} />
})

MenuItemGroup.displayName = 'MenuItemGroup'

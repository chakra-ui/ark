import type { GroupProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuItemGroupProps extends Assign<HTMLArkProps<'div'>, GroupProps> {}

export const MenuItemGroup = forwardRef<HTMLDivElement, MenuItemGroupProps>((props, ref) => {
  const [itemGroupProps, divProps] = createSplitProps<GroupProps>()(props, ['id'])

  const api = useMenuContext() as UseMenuReturn['api']
  const mergedProps = mergeProps(api?.getItemGroupProps(itemGroupProps) ?? {}, divProps)

  return <ark.div {...mergedProps} ref={ref} />
})

MenuItemGroup.displayName = 'MenuItemGroup'

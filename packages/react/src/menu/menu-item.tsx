import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemParams = Parameters<UseMenuReturn['api']['getItemProps']>[0]

export type MenuItemProps = Assign<HTMLArkProps<'button'>, MenuItemParams>

export const MenuItem = forwardRef<'div', MenuItemProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [menuItemProps, buttonProps] = createSplitProps<MenuItemParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])
  const mergedProps = mergeProps(api?.getItemProps(menuItemProps) ?? {}, buttonProps)
  return <ark.div {...mergedProps} ref={ref} />
})

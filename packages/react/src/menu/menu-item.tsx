import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

type MenuItemParams = Parameters<UseMenuReturn['api']['getItemProps']>[0]

export type MenuItemProps = Assign<ComponentPropsWithoutRef<typeof ark.button>, MenuItemParams>

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
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

MenuItem.displayName = 'MenuItem'

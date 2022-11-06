import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuItemProps = Assign<
  HTMLArkProps<'button'>,
  Parameters<UseMenuReturn['api']['getItemProps']>[0]
>

export const MenuItem = forwardRef<'button', MenuItemProps>((props, ref) => {
  const { api } = useMenuContext()
  const [menuItemProps, htmlProps] = splitProps(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
  ])

  return <ark.button {...api.getItemProps(menuItemProps)} {...htmlProps} ref={ref} />
})

import { forwardRef } from '@polymorphic-factory/react'
import { ark, HTMLArkProps } from '../factory'
import { Assign, splitProps } from '../split-props'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuGroupProps = Assign<
  HTMLArkProps<'div'>,
  Parameters<UseMenuReturn['api']['getGroupProps']>[0]
>

export const MenuGroup = forwardRef<'div', MenuGroupProps>((props, ref) => {
  const { api } = useMenuContext()
  const [menuGroupProps, htmlProps] = splitProps(props, ['id'])

  return <ark.div {...api.getGroupProps(menuGroupProps)} {...htmlProps} ref={ref} />
})

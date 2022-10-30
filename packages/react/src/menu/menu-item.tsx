import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { Assign, splitProps } from '../split-props'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuItemProps = Assign<
  HTMLAtlasProps<'button'>,
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

  return <atlas.button {...api.getItemProps(menuItemProps)} {...htmlProps} ref={ref} />
})

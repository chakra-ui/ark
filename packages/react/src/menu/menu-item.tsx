import type { connect } from '@zag-js/menu'
import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { Assign, splitProps } from '../split-props'
import { useMenuContext } from './menu-context'

export type MenuItemProps = Assign<
  HTMLAtlasProps<'div'>,
  Parameters<ReturnType<typeof connect>['getItemProps']>[0]
>

export const MenuItem = forwardRef<'div', MenuItemProps>((props, ref) => {
  const { api } = useMenuContext()
  const [menuItemProps, htmlProps] = splitProps(props, ['id'])

  return <atlas.div {...api.getItemProps(menuItemProps)} {...htmlProps} ref={ref} />
})

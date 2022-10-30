import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import { Assign, splitProps } from '../splitProps'
import * as React from 'react'
import { connect } from '@zag-js/menu'

export type MenuItemProps = Assign<
  HTMLAtlasProps<'div'>,
  Parameters<ReturnType<typeof connect>['getItemProps']>[0]
>

export const MenuItem = forwardRef<'div', MenuItemProps>((props, ref) => {
  const { api } = useMenuContext()
  const [menuItemProps, htmlProps] = splitProps(props, ['id'])

  return <atlas.div {...api.getItemProps(menuItemProps)} {...htmlProps} ref={ref} />
})

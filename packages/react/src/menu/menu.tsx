import * as React from 'react'
import { useMenu, UseMenuProps } from './use-menu'
import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { MenuProvider } from './menu-context'
import type { Assign } from '../splitProps'

export type MenuProps = Assign<HTMLAtlasProps<'div'>, UseMenuProps>

export const Menu = forwardRef<'div', MenuProps>((props, ref) => {
  const {
    api,
    machine,
    htmlProps: { children, ...htmlProps },
  } = useMenu(props)

  const menuContextValue = React.useMemo(() => ({ api, machine }), [api, machine])

  return (
    <atlas.div {...htmlProps} ref={ref}>
      <MenuProvider value={menuContextValue}>{children}</MenuProvider>
    </atlas.div>
  )
})

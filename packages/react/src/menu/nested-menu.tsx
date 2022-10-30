import * as React from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import type { Assign } from '../split-props'
import { MenuProvider, useMenuContext } from './menu-context'
import { useMenu, UseMenuProps } from './use-menu'

export type NestedMenuProps = Assign<HTMLAtlasProps<'div'>, UseMenuProps>

export const NestedMenu = forwardRef<'div', NestedMenuProps>((props, ref) => {
  const { api: parentApi, machine: parentMachine } = useMenuContext()
  const {
    api,
    machine,
    htmlProps: { children, ...htmlProps },
  } = useMenu(props)

  React.useEffect(() => {
    setTimeout(() => {
      parentApi.setChild(machine)
      api.setParent(parentMachine)
    })
  }, [])

  const menuContextValue = React.useMemo(() => ({ api, machine }), [api, machine])

  return (
    <atlas.div {...parentApi.getTriggerItemProps(api)} {...htmlProps} ref={ref}>
      <MenuProvider value={menuContextValue}>{children}</MenuProvider>
    </atlas.div>
  )
})

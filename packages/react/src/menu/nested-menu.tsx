import { forwardRef } from '@polymorphic-factory/react'
import * as React from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import type { Assign } from '../split-props'
import { splitProps } from '../split-props'
import { MenuProvider, useMenuContext } from './menu-context'
import { useMenu, UseMenuProps } from './use-menu'

export type NestedMenuProps = Assign<HTMLAtlasProps<'div'>, UseMenuProps>

export const NestedMenu = forwardRef<'div', NestedMenuProps>((props, ref) => {
  const { api: parentApi, machine: parentMachine } = useMenuContext()
  const [menuProps, { children, ...htmlProps }] = splitProps(props, [
    'activeId',
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'id',
    'ids',
    'loop',
    'onSelect',
    'onValueChange',
    'positioning',
  ])
  const { api, machine } = useMenu(menuProps)

  React.useEffect(() => {
    parentApi.setChild(machine)
    api.setParent(parentMachine)
  }, [])

  const menuContextValue = React.useMemo(() => ({ api, machine }), [api, machine])

  return (
    <atlas.div {...parentApi.getTriggerItemProps(api)} {...htmlProps} ref={ref}>
      <MenuProvider value={menuContextValue}>{children}</MenuProvider>
    </atlas.div>
  )
})

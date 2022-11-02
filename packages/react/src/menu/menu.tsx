import { forwardRef } from '@polymorphic-factory/react'
import type { ReactNode } from 'react'
import * as React from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../split-props'
import { MenuProvider } from './menu-context'
import { useMenu, UseMenuProps } from './use-menu'

export type MenuState = {
  isOpen: boolean
  onClose: () => void
}

export type MenuProps = Assign<
  HTMLAtlasProps<'div'>,
  UseMenuProps & {
    children?: ReactNode | ((state: MenuState) => ReactNode)
  }
>

export const Menu = forwardRef<'div', MenuProps>((props, ref) => {
  const {
    api,
    machine,
    htmlProps: { children, ...htmlProps },
  } = useMenu(props)

  const menuContextValue = React.useMemo(() => ({ api, machine }), [api, machine])

  const renderPropResult = runIfFn(children, { isOpen: api.isOpen, onClose: api.close })

  return (
    <atlas.div {...htmlProps} ref={ref}>
      <MenuProvider value={menuContextValue}>
        <>{renderPropResult}</>
      </MenuProvider>
    </atlas.div>
  )
})

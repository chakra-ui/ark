import type { Assign } from '@polymorphic-factory/solid'
import type { JSX } from 'solid-js'
import { children, createEffect } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, UseMenuProps, UseMenuReturn } from './use-menu'

export type MenuState = {
  isOpen: boolean
  onClose: () => void
}

export type MenuProps = Assign<
  UseMenuProps,
  {
    children?: JSX.Element | ((state: MenuState) => JSX.Element)
    isOpen?: boolean
  }
>

export const Menu = (props: MenuProps) => {
  const [menuProps, localProps] = createSplitProps<UseMenuProps>()(props, [
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
    'value',
  ])

  const parentApi = useMenuContext() as (() => ReturnType<UseMenuReturn>['api']) | undefined
  const parentMachine = useMenuMachineContext() as
    | (() => ReturnType<UseMenuReturn>['machine'])
    | undefined

  const menu = useMenu(menuProps)

  const view = () =>
    children(() =>
      runIfFn(localProps.children, {
        isOpen: menu().api.isOpen,
        onClose: menu().api.close,
      }),
    )

  if (parentMachine) {
    parentApi?.().setChild(menu().machine)
    menu().api.setParent(parentMachine())
  }

  createEffect(() => {
    if (localProps.isOpen && !menu().api.isOpen) {
      menu().api.open()
    }
  })

  return (
    <MenuTriggerItemProvider value={() => parentApi?.().getTriggerItemProps(menu().api)}>
      <MenuMachineProvider value={() => menu().machine}>
        <MenuProvider value={() => menu().api}>{view()}</MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}

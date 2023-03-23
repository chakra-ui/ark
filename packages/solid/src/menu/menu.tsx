import { type Assign } from '@polymorphic-factory/solid'
import { children, createEffect, createMemo, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { runIfFn } from '../run-if-fn'
import {
  MenuMachineProvider,
  MenuProvider,
  MenuTriggerItemProvider,
  useMenuContext,
  useMenuMachineContext,
} from './menu-context'
import { useMenu, type UseMenuProps } from './use-menu'

export type MenuState = {
  isOpen?: boolean
  onClose?: () => void
}

export type MenuProps = Assign<
  UseMenuProps,
  {
    children?: JSX.Element | ((state: Accessor<MenuState>) => JSX.Element)
    isOpen?: Accessor<boolean>
  }
>

export const Menu = (props: MenuProps) => {
  const [menuProps, localProps] = createSplitProps<UseMenuProps>()(props, [
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'highlightedId',
    'id',
    'ids',
    'loop',
    'onClose',
    'onOpen',
    'onSelect',
    'onValueChange',
    'positioning',
    'value',
  ])

  const parentMenu = useMenuContext()
  const parentMachine = useMenuMachineContext()

  const menu = useMenu(menuProps)

  createEffect(() => {
    if (!parentMachine) return

    parentMenu?.().setChild(menu().machine)
    menu().api().setParent(parentMachine())
  })

  createEffect(() => {
    if (!localProps.isOpen) return

    localProps.isOpen?.() ? menu().api().open() : menu().api().close()
  })

  return (
    <MenuTriggerItemProvider
      value={createMemo(() => parentMenu?.().getTriggerItemProps(menu().api()))}
    >
      <MenuMachineProvider value={() => menu().machine}>
        <MenuProvider value={menu().api}>
          <MenuContextWrapper>{localProps.children}</MenuContextWrapper>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}

const MenuContextWrapper = (props: Pick<MenuProps, 'children'>) => {
  const menu = useMenuContext()
  const view = () =>
    children(() =>
      runIfFn(
        props.children,
        createMemo(() => ({
          isOpen: menu?.().isOpen,
          onClose: menu?.().close,
        })),
      ),
    )

  return <>{view()}</>
}

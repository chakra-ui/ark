import { mergeProps } from '@zag-js/solid'
import { createEffect, createMemo, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { useMenu, type UseMenuProps } from './use-menu'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

export interface MenuRootProps extends UseMenuProps, UsePresenceProps {
  children?: JSX.Element
}

export const MenuRoot = (props: MenuRootProps) => {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const [useMenuProps, localProps] = createSplitProps<UseMenuProps>()(menuProps, [
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'dir',
    'getRootNode',
    'highlightedValue',
    'id',
    'ids',
    'loop',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'open',
    'positioning',
  ])

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const { api, machine } = useMenu(useMenuProps)

  const presenceApi = usePresence(mergeProps(presenceProps, () => ({ present: api().isOpen })))

  createEffect(() => {
    if (!parentMachine) return
    parentApi?.().setChild(machine)
    api().setParent(parentMachine)
  })

  const triggerItemContext = createMemo(() => parentApi?.().getTriggerItemProps(api()))

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={machine}>
        <MenuProvider value={api}>
          <PresenceProvider value={presenceApi}>{localProps.children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}

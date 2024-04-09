import { mergeProps } from '@zag-js/react'
import { useCallback, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import {
  PresenceProvider,
  splitPresenceProps,
  usePresence,
  type UsePresenceProps,
} from '../presence'
import { useEffectOnce } from '../use-effect-once'
import { useMenu, type UseMenuProps } from './use-menu'
import { MenuProvider, useMenuContext } from './use-menu-context'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context'

export interface MenuRootProps extends UseMenuProps, UsePresenceProps {
  children?: ReactNode
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
  const presence = usePresence(mergeProps({ present: api.isOpen }, presenceProps))

  useEffectOnce(() => {
    if (!parentMachine) return
    if (!parentApi) return

    parentApi.setChild(machine)
    api.setParent(parentMachine)
  })

  const triggerItemContext = useCallback(
    () => parentApi?.getTriggerItemProps(api),
    [api, parentApi],
  )

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={machine}>
        <MenuProvider value={api}>
          <PresenceProvider value={presence} {...localProps} />
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}

import { mergeProps } from '@zag-js/react'
import { type ReactNode, useCallback } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { useEffectOnce } from '../../utils/use-effect-once'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseMenuProps, useMenu } from './use-menu'
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
    'defaultOpen',
    'highlightedValue',
    'id',
    'ids',
    'loopFocus',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onSelect',
    'open',
    'positioning',
    'typeahead',
  ])

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const { api, machine } = useMenu(useMenuProps)
  const presence = usePresence(mergeProps({ present: api.open }, presenceProps))

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

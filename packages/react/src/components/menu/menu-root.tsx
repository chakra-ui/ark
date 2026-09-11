'use client'

import { mergeProps } from '@zag-js/react'
import { type ReactNode, useCallback } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useEffectOnce } from '../../utils/use-effect-once.ts'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.ts'
import { type UseMenuProps, useMenu } from './use-menu.ts'
import { MenuProvider, useMenuContext } from './use-menu-context.ts'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context.ts'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context.ts'

export interface MenuRootBaseProps extends UseMenuProps, UsePresenceProps {}
export interface MenuRootProps extends MenuRootBaseProps {
  children?: ReactNode | undefined
}

const splitRootProps = createSplitProps<UseMenuProps>()

export const MenuRoot = (props: MenuRootProps) => {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const [useMenuProps, localProps] = splitRootProps(menuProps, [
    'anchorPoint',
    'aria-label',
    'closeOnSelect',
    'composite',
    'defaultHighlightedValue',
    'defaultOpen',
    'highlightedValue',
    'id',
    'ids',
    'loopFocus',
    'navigate',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onHighlightChange',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'onRequestDismiss',
    'onSelect',
    'onTriggerValueChange',
    'open',
    'positioning',
    'triggerValue',
    'defaultTriggerValue',
    'typeahead',
  ])

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const { api, service } = useMenu(useMenuProps)
  const presence = usePresence(mergeProps({ present: api.open }, presenceProps))

  useEffectOnce(() => {
    if (!parentMachine) return
    if (!parentApi) return

    parentApi.setChild(service)
    api.setParent(parentMachine)
  })

  const triggerItemContext = useCallback(() => parentApi?.getTriggerItemProps(api), [api, parentApi])

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={service}>
        <MenuProvider value={api}>
          <PresenceProvider value={presence} {...localProps} />
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}

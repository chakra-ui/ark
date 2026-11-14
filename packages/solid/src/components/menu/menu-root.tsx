import { mergeProps } from '@zag-js/solid'
import { onSettled } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence/index.tsx'
import { type UseMenuProps, useMenu } from './use-menu.ts'
import { MenuProvider, useMenuContext } from './use-menu-context.ts'
import { MenuMachineProvider, useMenuMachineContext } from './use-menu-machine-context.ts'
import { MenuTriggerItemProvider } from './use-menu-trigger-item-context.ts'

export interface MenuRootBaseProps extends UseMenuProps, UsePresenceProps {}
export interface MenuRootProps extends MenuRootBaseProps {
  children?: JSX.Element
}

export const MenuRoot = (props: MenuRootProps) => {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const [useMenuProps, localProps] = createSplitProps<UseMenuProps>()(menuProps, [
    'anchorPoint',
    'autoHighlight',
    'aria-label',
    'closeOnSelect',
    'collection',
    'popupType',
    'defaultHighlightedValue',
    'defaultOpen',
    'finalFocusEl',
    'highlightedValue',
    'id',
    'ids',
    'initialFocusEl',
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
    'open',
    'positioning',
    'scrollToIndexFn',
    'typeahead',
    'triggerValue',
    'defaultTriggerValue',
    'onTriggerValueChange',
  ])

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const menu = useMenu(useMenuProps)
  const presenceApi = usePresence(mergeProps(presenceProps, () => ({ present: menu.api().open })))

  onSettled(() => {
    if (!parentMachine) return
    parentApi?.().setChild(menu.service)
    menu.api().setParent(parentMachine)
  })

  const triggerItemContext = () => parentApi?.().getTriggerItemProps(menu.api())

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={menu.service}>
        <MenuProvider value={menu.api}>
          <PresenceProvider value={presenceApi}>{localProps.children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}

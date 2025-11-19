import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseNavigationMenuProps, useNavigationMenu } from './use-navigation-menu'
import { NavigationMenuProvider } from './use-navigation-menu-context'
import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'

export interface NavigationMenuRootBaseProps extends UseNavigationMenuProps, UsePresenceProps, PolymorphicProps {}
export interface NavigationMenuRootProps extends Assign<HTMLProps<'nav'>, NavigationMenuRootBaseProps> {}

export const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuRootProps>((props, ref) => {
  const [presenceProps, navigationMenuProps] = splitPresenceProps(props)
  const [useNavigationMenuProps, localProps] = createSplitProps<UseNavigationMenuProps>()(navigationMenuProps, [
    'closeDelay',
    'defaultValue',
    'disableClickTrigger',
    'disableHoverTrigger',
    'disablePointerLeaveClose',
    'id',
    'ids',
    'onValueChange',
    'openDelay',
    'orientation',
    'value',
  ])
  const navigationMenu = useNavigationMenu(useNavigationMenuProps)
  const presence = usePresence(mergeProps({ present: navigationMenu.open }, presenceProps))
  const mergedProps = mergeProps(navigationMenu.getRootProps(), localProps)

  return (
    <NavigationMenuProvider value={navigationMenu}>
      <PresenceProvider value={presence}>
        <ark.nav {...mergedProps} ref={ref} />
      </PresenceProvider>
    </NavigationMenuProvider>
  )
})

NavigationMenuRoot.displayName = 'NavigationMenuRoot'

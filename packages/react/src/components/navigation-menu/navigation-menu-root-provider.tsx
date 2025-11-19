import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseNavigationMenuReturn } from './use-navigation-menu'
import { NavigationMenuProvider } from './use-navigation-menu-context'
import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'

interface RootProviderProps {
  value: UseNavigationMenuReturn
}

export interface NavigationMenuRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface NavigationMenuRootProviderProps extends HTMLProps<'nav'>, NavigationMenuRootProviderBaseProps {}

export const NavigationMenuRootProvider = forwardRef<HTMLElement, NavigationMenuRootProviderProps>((props, ref) => {
  const [presenceProps, navigationMenuProps] = splitPresenceProps(props)
  const [{ value: navigationMenu }, localProps] = createSplitProps<RootProviderProps>()(navigationMenuProps, ['value'])
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

NavigationMenuRootProvider.displayName = 'NavigationMenuRootProvider'

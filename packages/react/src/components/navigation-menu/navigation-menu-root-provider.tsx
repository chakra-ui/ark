import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseNavigationMenuReturn } from './use-navigation-menu'
import { NavigationMenuProvider } from './use-navigation-menu-context'

interface RootProviderProps {
  value: UseNavigationMenuReturn
}

export interface NavigationMenuRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface NavigationMenuRootProviderProps extends HTMLProps<'nav'>, NavigationMenuRootProviderBaseProps {}

export const NavigationMenuRootProvider = forwardRef<HTMLElement, NavigationMenuRootProviderProps>((props, ref) => {
  const [renderStrategyProps, navigationMenuProps] = splitRenderStrategyProps(props)
  const [{ value: navigationMenu }, localProps] = createSplitProps<RootProviderProps>()(navigationMenuProps, ['value'])
  const mergedProps = mergeProps(navigationMenu.getRootProps(), localProps)

  return (
    <NavigationMenuProvider value={navigationMenu}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.nav {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </NavigationMenuProvider>
  )
})

NavigationMenuRootProvider.displayName = 'NavigationMenuRootProvider'

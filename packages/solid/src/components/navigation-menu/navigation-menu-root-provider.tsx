import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseNavigationMenuReturn } from './use-navigation-menu.ts'
import { NavigationMenuProvider } from './use-navigation-menu-context.ts'

interface RootProviderProps {
  value: UseNavigationMenuReturn
}

export interface NavigationMenuRootProviderBaseProps extends RenderStrategyProps, PolymorphicProps<'nav'> {}
export interface NavigationMenuRootProviderProps
  extends HTMLProps<'nav'>, RootProviderProps, NavigationMenuRootProviderBaseProps {}

export const NavigationMenuRootProvider = (props: NavigationMenuRootProviderProps) => {
  const [renderStrategyProps, navigationMenuProps] = splitRenderStrategyProps(props)
  const [{ value: navigationMenu }, localProps] = createSplitProps<RootProviderProps>()(navigationMenuProps, ['value'])
  const mergedProps = mergeProps(() => navigationMenu().getRootProps(), localProps)

  return (
    <NavigationMenuProvider value={navigationMenu}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.nav {...mergedProps} />
      </RenderStrategyProvider>
    </NavigationMenuProvider>
  )
}

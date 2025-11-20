import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type RenderStrategyProps, RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseNavigationMenuReturn } from './use-navigation-menu'
import { NavigationMenuProvider } from './use-navigation-menu-context'

interface RootProviderProps {
  value: UseNavigationMenuReturn
}

export interface NavigationMenuRootProviderBaseProps extends RenderStrategyProps, PolymorphicProps<'nav'> {}
export interface NavigationMenuRootProviderProps
  extends HTMLProps<'nav'>,
    RootProviderProps,
    NavigationMenuRootProviderBaseProps {}

export const NavigationMenuRootProvider = (props: NavigationMenuRootProviderProps) => {
  const [renderStrategyProps, navigationMenuProps] = splitRenderStrategyProps(props)
  const [{ value: api }, restProps] = createSplitProps<RootProviderProps>()(navigationMenuProps, ['value'])
  const mergedProps = mergeProps(() => api().getRootProps(), restProps)

  return (
    <NavigationMenuProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.nav {...mergedProps} />
      </RenderStrategyProvider>
    </NavigationMenuProvider>
  )
}

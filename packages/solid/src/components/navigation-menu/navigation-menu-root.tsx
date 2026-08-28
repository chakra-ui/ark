import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseNavigationMenuProps, useNavigationMenu } from './use-navigation-menu.ts'
import { NavigationMenuProvider } from './use-navigation-menu-context.ts'

export interface NavigationMenuRootBaseProps
  extends UseNavigationMenuProps, RenderStrategyProps, PolymorphicProps<'nav'> {}
export interface NavigationMenuRootProps extends HTMLProps<'nav'>, NavigationMenuRootBaseProps {}

export const NavigationMenuRoot = (props: NavigationMenuRootProps) => {
  const [renderStrategyProps, navigationMenuProps] = splitRenderStrategyProps(props)
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
    'translations',
    'value',
  ])

  const api = useNavigationMenu(useNavigationMenuProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <NavigationMenuProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.nav {...mergedProps} />
      </RenderStrategyProvider>
    </NavigationMenuProvider>
  )
}

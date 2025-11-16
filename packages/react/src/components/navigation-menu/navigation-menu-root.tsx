import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { NavigationMenuContentProvider } from './navigation-menu-viewport-content-context'
import { type UseNavigationMenuProps, useNavigationMenu } from './use-navigation-menu'
import { NavigationMenuProvider } from './use-navigation-menu-context'

export interface NavigationMenuRootBaseProps extends UseNavigationMenuProps, RenderStrategyProps, PolymorphicProps {}
export interface NavigationMenuRootProps extends Assign<HTMLProps<'nav'>, NavigationMenuRootBaseProps> {}

export const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuRootProps>((props, ref) => {
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
    'value',
  ])
  const navigationMenu = useNavigationMenu(useNavigationMenuProps)
  const mergedProps = mergeProps(navigationMenu.getRootProps(), localProps)

  return (
    <NavigationMenuContentProvider>
      <NavigationMenuProvider value={navigationMenu}>
        <RenderStrategyPropsProvider value={renderStrategyProps}>
          <ark.nav {...mergedProps} ref={ref} />
        </RenderStrategyPropsProvider>
      </NavigationMenuProvider>
    </NavigationMenuContentProvider>
  )
})

NavigationMenuRoot.displayName = 'NavigationMenuRoot'

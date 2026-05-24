'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { type UseNavigationMenuProps, useNavigationMenu } from './use-navigation-menu.ts'
import { NavigationMenuProvider } from './use-navigation-menu-context.ts'

export interface NavigationMenuRootBaseProps extends UseNavigationMenuProps, RenderStrategyProps, PolymorphicProps {}
export interface NavigationMenuRootProps extends Assign<HTMLProps<'nav'>, NavigationMenuRootBaseProps> {}

const splitRootProps = createSplitProps<UseNavigationMenuProps>()

export const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuRootProps>((props, ref) => {
  const [renderStrategyProps, navigationMenuProps] = splitRenderStrategyProps(props)
  const [useNavigationMenuProps, localProps] = splitRootProps(navigationMenuProps, [
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
  const navigationMenu = useNavigationMenu(useNavigationMenuProps)
  const mergedProps = mergeProps(navigationMenu.getRootProps(), localProps)

  return (
    <NavigationMenuProvider value={navigationMenu}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.nav {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </NavigationMenuProvider>
  )
})

NavigationMenuRoot.displayName = 'NavigationMenuRoot'

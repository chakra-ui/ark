import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { createSplitProps } from '../../utils/create-split-props'

export interface NavigationMenuTriggerProxyBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuTriggerProxyProps extends HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps {}

export const NavigationMenuTriggerProxy = forwardRef<HTMLDivElement, NavigationMenuTriggerProxyProps>((props, ref) => {
  const [triggerProxyProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getTriggerProxyProps(triggerProxyProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuTriggerProxy.displayName = 'NavigationMenuTriggerProxy'

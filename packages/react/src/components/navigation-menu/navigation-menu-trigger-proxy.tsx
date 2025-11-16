import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuTriggerProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {
  value?: string
}
export interface NavigationMenuTriggerProxyProps
  extends Assign<HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps> {}

export const NavigationMenuTriggerProxy = forwardRef<HTMLDivElement, NavigationMenuTriggerProxyProps>((props, ref) => {
  const itemPropsContext = useNavigationMenuItemPropsContext()
  const [_triggerProxyProps, localProps] = createSplitProps<Partial<ItemProps>>()(props, ['disabled', 'value'])
  const triggerProxyProps = { ...itemPropsContext, ..._triggerProxyProps }
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getTriggerProxyProps(triggerProxyProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuTriggerProxy.displayName = 'NavigationMenuTriggerProxy'

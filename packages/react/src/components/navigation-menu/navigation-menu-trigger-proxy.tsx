import type { ItemProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/react'
import { ensure } from '@zag-js/utils'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuTriggerProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {}
export interface NavigationMenuTriggerProxyProps extends HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuTriggerProxy = forwardRef<HTMLDivElement, NavigationMenuTriggerProxyProps>((props, ref) => {
  const itemContext = useNavigationMenuItemPropsContext()
  ensure(itemContext, () => 'NavigationMenu.TriggerProxy must be used within NavigationMenu.Item')

  const value = itemContext.value
  const disabled = props.disabled ?? itemContext.disabled

  const [triggerProxyProps, localProps] = splitItemProps({ ...props, value, disabled }, ['value', 'disabled'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getTriggerProxyProps(triggerProxyProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuTriggerProxy.displayName = 'NavigationMenuTriggerProxy'

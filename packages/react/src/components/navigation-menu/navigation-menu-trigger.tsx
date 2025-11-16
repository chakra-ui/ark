import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuTriggerBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {
  value?: string
}
export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>((props, ref) => {
  const itemPropsContext = useNavigationMenuItemPropsContext()
  const [_triggerProps, localProps] = createSplitProps<Partial<ItemProps>>()(props, ['disabled', 'value'])
  const triggerProps = { ...itemPropsContext, ..._triggerProps }
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

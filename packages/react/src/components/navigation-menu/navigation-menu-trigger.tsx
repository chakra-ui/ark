import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { ensure } from '@zag-js/utils'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { createSplitProps } from '../../utils/create-split-props'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuTriggerBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {}
export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>((props, ref) => {
  const itemContext = useNavigationMenuItemPropsContext()
  ensure(itemContext, () => 'NavigationMenu.Trigger must be used within NavigationMenu.Item')

  const value = itemContext.value
  const disabled = props.disabled ?? itemContext.disabled

  const [triggerProps, localProps] = splitItemProps({ ...props, value, disabled }, ['value', 'disabled'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

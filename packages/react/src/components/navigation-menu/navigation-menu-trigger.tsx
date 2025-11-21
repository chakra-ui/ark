import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { createSplitProps } from '../../utils/create-split-props'

export interface NavigationMenuTriggerBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import type { Assign } from '../../types'

export interface NavigationMenuTriggerBaseProps extends ItemProps, PolymorphicProps<'button'> {}
export interface NavigationMenuTriggerProps extends Assign<HTMLProps<'button'>, NavigationMenuTriggerBaseProps> {}

export const NavigationMenuTrigger = (props: NavigationMenuTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}

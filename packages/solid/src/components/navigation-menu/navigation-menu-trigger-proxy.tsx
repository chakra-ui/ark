import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuTriggerProxyBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface NavigationMenuTriggerProxyProps extends HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps {}

export const NavigationMenuTriggerProxy = (props: NavigationMenuTriggerProxyProps) => {
  const [triggerProxyProps, localProps] = createSplitProps<ItemProps>()(props, ['value', 'disabled'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getTriggerProxyProps(triggerProxyProps), localProps)

  return <ark.div {...mergedProps} />
}

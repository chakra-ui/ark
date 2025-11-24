import type { ItemProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuTriggerProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps<'div'> {}
export interface NavigationMenuTriggerProxyProps extends HTMLProps<'div'>, NavigationMenuTriggerProxyBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuTriggerProxy = (props: NavigationMenuTriggerProxyProps) => {
  const itemContext = useNavigationMenuItemPropsContext()
  if (!itemContext) {
    throw new Error('NavigationMenu.TriggerProxy must be used within NavigationMenu.Item')
  }
  const value = createMemo(() => itemContext.value)
  const disabled = createMemo(() => props.disabled ?? itemContext.disabled)

  const combinedProps = mergeProps(props, () => ({ value: value(), disabled: disabled() }))
  const [triggerProxyProps, localProps] = splitItemProps(combinedProps, ['value', 'disabled'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getTriggerProxyProps(triggerProxyProps), localProps)

  return <ark.div {...mergedProps} />
}

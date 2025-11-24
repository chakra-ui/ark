import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/navigation-menu'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuViewportProxyBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps<'div'> {}
export interface NavigationMenuViewportProxyProps extends HTMLProps<'div'>, NavigationMenuViewportProxyBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuViewportProxy = (props: NavigationMenuViewportProxyProps) => {
  const itemContext = useNavigationMenuItemPropsContext()
  if (!itemContext) {
    throw new Error('NavigationMenu.ViewportProxy must be used within NavigationMenu.Item')
  }
  const value = createMemo(() => itemContext.value)
  const disabled = createMemo(() => props.disabled ?? itemContext.disabled)

  const combinedProps = mergeProps(props, () => ({ value: value(), disabled: disabled() }))
  const [viewportProxyProps, localProps] = splitItemProps(combinedProps, ['disabled', 'value'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getViewportProxyProps(viewportProxyProps), localProps)

  return <ark.div {...mergedProps} />
}

import type { ItemProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { NavigationMenuItemPropsProvider } from './use-navigation-menu-item-props-context.ts'

export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface NavigationMenuItemProps extends HTMLProps<'div'>, NavigationMenuItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const [itemProps, localProps] = splitItemProps(props, ['disabled', 'value'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return (
    <NavigationMenuItemPropsProvider value={itemProps}>
      <ark.div {...mergedProps} />
    </NavigationMenuItemPropsProvider>
  )
}

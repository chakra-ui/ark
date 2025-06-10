import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface MenuItemIndicatorProps extends HTMLProps<'div'>, MenuItemIndicatorBaseProps {}

export const MenuItemIndicator = (props: MenuItemIndicatorProps) => {
  const context = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  // @ts-expect-error - TODO: fix this
  const mergedProps = mergeProps(() => context().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}

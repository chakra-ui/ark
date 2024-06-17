import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface MenuItemIndicatorProps extends HTMLProps<'div'>, MenuItemIndicatorBaseProps {}

export const MenuItemIndicator = (props: MenuItemIndicatorProps) => {
  const context = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemIndicatorProps(optionItemProps), props)

  return <ark.div {...mergedProps} />
}

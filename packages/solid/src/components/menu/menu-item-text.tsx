import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemTextBaseProps extends PolymorphicProps<'div'> {}
export interface MenuItemTextProps extends HTMLProps<'div'>, MenuItemTextBaseProps {}

export const MenuItemText = (props: MenuItemTextProps) => {
  const context = useMenuContext()
  const itemProps = useMenuItemPropsContext()

  const mergedProps = mergeProps(() => context().getItemTextProps(itemProps), props)

  return <ark.div {...mergedProps} />
}

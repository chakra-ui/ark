import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'
import { useMenuItemPropsContext } from './use-menu-option-item-props-context.ts'

export interface MenuItemIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface MenuItemIndicatorProps extends HTMLProps<'span'>, MenuItemIndicatorBaseProps {}

export const MenuItemIndicator = (props: MenuItemIndicatorProps) => {
  const context = useMenuContext()
  const itemProps = useMenuItemPropsContext()

  const mergedProps = mergeProps(() => context().getItemIndicatorProps(itemProps), props)

  return <ark.span {...mergedProps} />
}

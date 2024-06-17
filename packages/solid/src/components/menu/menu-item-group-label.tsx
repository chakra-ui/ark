import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

export interface MenuItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
export interface MenuItemGroupLabelProps extends HTMLProps<'div'>, MenuItemGroupLabelBaseProps {}

export const MenuItemGroupLabel = (props: MenuItemGroupLabelProps) => {
  const context = useMenuContext()
  const itemGroupContext = useMenuItemGroupContext()
  const mergedProps = mergeProps(
    context().getItemGroupLabelProps({ htmlFor: itemGroupContext.id }),
    props,
  )

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

export interface MenuItemGroupLabelProps extends HTMLArkProps<'div'> {}

export const MenuItemGroupLabel = (props: MenuItemGroupLabelProps) => {
  const context = useMenuContext()
  const itemGroupContext = useMenuItemGroupContext()
  const mergedProps = mergeProps(
    context().getItemGroupLabelProps({ htmlFor: itemGroupContext.id }),
    props,
  )

  return <ark.div {...mergedProps} />
}

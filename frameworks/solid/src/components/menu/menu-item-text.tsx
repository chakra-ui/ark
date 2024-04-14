import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuItemTextProps extends HTMLArkProps<'div'> {}

export const MenuItemText = (props: MenuItemTextProps) => {
  const context = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemTextProps(optionItemProps), props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuItemIndicator = (props: MenuItemIndicatorProps) => {
  const context = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(() => context().getItemIndicatorProps(optionItemProps), props)

  return <ark.div {...mergedProps} />
}

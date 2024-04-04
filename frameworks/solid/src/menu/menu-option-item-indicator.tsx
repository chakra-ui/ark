import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemIndicator = (props: MenuOptionItemIndicatorProps) => {
  const menu = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(() => menu?.().getOptionItemIndicatorProps(optionItemProps), props)

  return <ark.div {...mergedProps()} />
}

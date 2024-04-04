import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemTextProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemText = (props: MenuOptionItemTextProps) => {
  const menu = useMenuContext()
  const optionItemProps = useMenuOptionItemPropsContext()
  const mergedProps = mergeProps(() => menu?.().getOptionItemTextProps(optionItemProps), props)

  return <ark.div {...mergedProps()} />
}

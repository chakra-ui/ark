import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuArrowProps = HTMLArkProps<'div'>

export const MenuArrow = (props: MenuArrowProps) => {
  const menu = useMenuContext()

  return <ark.div {...menu?.().arrowProps} {...props} />
}

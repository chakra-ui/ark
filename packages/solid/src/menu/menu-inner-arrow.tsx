import { ark, HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuInnerArrowProps = HTMLArkProps<'div'>

export const MenuInnerArrow = (props: MenuInnerArrowProps) => {
  const menu = useMenuContext()

  return <ark.div {...menu?.().innerArrowProps} {...props} />
}

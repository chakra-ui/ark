import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuArrowTipProps = HTMLArkProps<'div'>

export const MenuArrowTip = (props: MenuArrowTipProps) => {
  const menu = useMenuContext()

  return <ark.div {...menu?.().arrowTipProps} {...props} />
}

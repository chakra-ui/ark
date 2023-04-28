import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuPositionerProps = HTMLArkProps<'div'>

export const MenuPositioner = (props: MenuPositionerProps) => {
  const menu = useMenuContext()
  return <ark.div {...menu?.().positionerProps} {...props} />
}

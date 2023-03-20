import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent = (props: MenuContentProps) => {
  const menu = useMenuContext()

  return <ark.div {...menu?.()?.contentProps} {...props} />
}

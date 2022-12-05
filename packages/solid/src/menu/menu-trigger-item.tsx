import { ark, HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './menu-context'

export type MenuTriggerItemProps = HTMLArkProps<'div'>

export const MenuTriggerItem = (props: MenuTriggerItemProps) => {
  const getTriggerItemProps = useMenuTriggerItemContext()

  return <ark.div {...getTriggerItemProps?.()} {...props} />
}

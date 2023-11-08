import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './menu-context'

export interface MenuTriggerItemProps extends HTMLArkProps<'div'> {}

export const MenuTriggerItem = (props: MenuTriggerItemProps) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const triggerProps = mergeProps(() => getTriggerItemProps?.(), props)
  return <ark.div {...triggerProps} />
}

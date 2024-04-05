import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

export interface MenuTriggerItemProps extends HTMLArkProps<'div'> {}

export const MenuTriggerItem = (props: MenuTriggerItemProps) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(() => getTriggerItemProps?.(), props)

  return <ark.div {...mergedProps} />
}

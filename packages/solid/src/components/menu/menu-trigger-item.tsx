import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

export interface MenuTriggerItemBaseProps extends PolymorphicProps<'div'> {}
export interface MenuTriggerItemProps extends HTMLProps<'div'>, MenuTriggerItemBaseProps {}

export const MenuTriggerItem = (props: MenuTriggerItemProps) => {
  const getTriggerItemProps = useMenuTriggerItemContext()
  const mergedProps = mergeProps(() => getTriggerItemProps?.(), props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuContextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface MenuContextTriggerProps extends HTMLProps<'button'>, MenuContextTriggerBaseProps {}

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getContextTriggerProps(), props)

  return <ark.button {...mergedProps} />
}

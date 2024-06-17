import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuContextTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface MenuContextTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    MenuContextTriggerBaseProps {}

export const MenuContextTrigger = (props: MenuContextTriggerProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getContextTriggerProps(), props)

  return <ark.button {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface MenuArrowTipProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    MenuArrowTipBaseProps {}

export const MenuArrowTip = (props: MenuArrowTipProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getArrowTipProps(), props)

  return <ark.div {...mergedProps} />
}

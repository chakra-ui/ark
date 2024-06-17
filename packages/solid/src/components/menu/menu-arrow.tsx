import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuArrowBaseProps extends PolymorphicProps<'div'> {}
export interface MenuArrowProps extends JSX.HTMLAttributes<HTMLDivElement>, MenuArrowBaseProps {}

export const MenuArrow = (props: MenuArrowProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}

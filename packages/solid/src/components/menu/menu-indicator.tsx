import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface MenuIndicatorProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    MenuIndicatorBaseProps {}

export const MenuIndicator = (props: MenuIndicatorProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}

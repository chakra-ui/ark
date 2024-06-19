import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'

export interface MenuIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface MenuIndicatorProps extends HTMLProps<'div'>, MenuIndicatorBaseProps {}

export const MenuIndicator = (props: MenuIndicatorProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}

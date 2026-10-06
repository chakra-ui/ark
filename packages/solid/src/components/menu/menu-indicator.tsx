import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuIndicatorBaseProps extends PolymorphicProps<'span'> {}
export interface MenuIndicatorProps extends HTMLProps<'span'>, MenuIndicatorBaseProps {}

export const MenuIndicator = (props: MenuIndicatorProps) => {
  const context = useMenuContext()
  const mergedProps = mergeProps(() => context().getIndicatorProps(), props)

  return <ark.span {...mergedProps} />
}

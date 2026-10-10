import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuListBaseProps extends PolymorphicProps<'div'> {}
export interface MenuListProps extends HTMLProps<'div'>, MenuListBaseProps {}

export const MenuList = (props: MenuListProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu().getListProps(), props)

  return <ark.div {...mergedProps} />
}

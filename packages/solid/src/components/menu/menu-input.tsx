import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuInputBaseProps extends PolymorphicProps<'input'> {}
export interface MenuInputProps extends HTMLProps<'input'>, MenuInputBaseProps {}

export const MenuInput = (props: MenuInputProps) => {
  const menu = useMenuContext()
  const mergedProps = mergeProps(() => menu().getInputProps(), props)

  return <ark.input {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerTitleBaseProps extends PolymorphicProps<'h2'> {}
export interface DrawerTitleProps extends HTMLProps<'h2'>, DrawerTitleBaseProps {}

export const DrawerTitle = (props: DrawerTitleProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getTitleProps(), props)

  return <ark.h2 {...mergedProps} />
}

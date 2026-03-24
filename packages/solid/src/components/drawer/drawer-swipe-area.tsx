import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = (props: DrawerSwipeAreaProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getSwipeAreaProps(), props)

  return <ark.div {...mergedProps} />
}

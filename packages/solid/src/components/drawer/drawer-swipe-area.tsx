import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = (props: DrawerSwipeAreaProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getSwipeAreaProps(), props)

  return <ark.div {...mergedProps} />
}

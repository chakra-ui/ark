import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDrawerContext } from './use-drawer-context.ts'
import type { SwipeAreaState } from '@zag-js/drawer'

export interface DrawerSwipeAreaState extends SwipeAreaState {}

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<'div', DrawerSwipeAreaState> {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = (props: DrawerSwipeAreaProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getSwipeAreaProps(), props)

  return <ark.div {...mergedProps} state={drawer().getSwipeAreaState()} />
}

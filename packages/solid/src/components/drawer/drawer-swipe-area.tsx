import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface DrawerSwipeAreaBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerSwipeAreaProps extends HTMLProps<'div'>, DrawerSwipeAreaBaseProps {}

export const DrawerSwipeArea = (props: DrawerSwipeAreaProps) => {
  return <ark.div {...props} />
}

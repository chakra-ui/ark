import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerGrabberBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerGrabberProps extends HTMLProps<'div'>, DrawerGrabberBaseProps {}

export const DrawerGrabber = (props: DrawerGrabberProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getGrabberProps(), props)

  return <ark.div {...mergedProps} />
}

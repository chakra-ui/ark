import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerGrabberIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerGrabberIndicatorProps extends HTMLProps<'div'>, DrawerGrabberIndicatorBaseProps {}

export const DrawerGrabberIndicator = (props: DrawerGrabberIndicatorProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getGrabberIndicatorProps(), props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerContext } from './use-drawer-context'

export interface DrawerDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerDescriptionProps extends HTMLProps<'div'>, DrawerDescriptionBaseProps {}

export const DrawerDescription = (props: DrawerDescriptionProps) => {
  const drawer = useDrawerContext()
  const mergedProps = mergeProps(() => drawer().getDescriptionProps(), props)

  return <ark.div {...mergedProps} />
}

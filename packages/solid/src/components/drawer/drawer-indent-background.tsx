import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'

export interface DrawerIndentBackgroundBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerIndentBackgroundProps extends HTMLProps<'div'>, DrawerIndentBackgroundBaseProps {}

export const DrawerIndentBackground = (props: DrawerIndentBackgroundProps) => {
  const stackApi = useDrawerStackContext()
  const mergedProps = mergeProps(() => stackApi().getIndentBackgroundProps(), props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDrawerStackContext } from './use-drawer-stack-context'

export interface DrawerIndentBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerIndentProps extends HTMLProps<'div'>, DrawerIndentBaseProps {}

export const DrawerIndent = (props: DrawerIndentProps) => {
  const stackApi = useDrawerStackContext()
  const mergedProps = mergeProps(() => stackApi().getIndentProps(), props)

  return <ark.div {...mergedProps} />
}

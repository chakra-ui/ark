import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootBaseProps extends PolymorphicProps<'div'> {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getRootProps(), props)

  return (
    <ark.div {...mergedProps}>
      <ark.div {...toast().getGhostBeforeProps()} />
      {props.children}
      <ark.div {...toast().getGhostAfterProps()} />
    </ark.div>
  )
}

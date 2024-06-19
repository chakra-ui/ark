import { mergeProps } from '@zag-js/solid'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootBaseProps extends PolymorphicProps<'div'> {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getRootProps(), props)

  return (
    <div {...mergedProps}>
      <div {...toast().getGhostBeforeProps()} />
      {props.children}
      <div {...toast().getGhostAfterProps()} />
    </div>
  )
}

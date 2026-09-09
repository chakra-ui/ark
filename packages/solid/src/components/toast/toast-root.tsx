import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useToastContext } from './use-toast-context.ts'
import type { RootState } from '@zag-js/toast'

export interface ToastRootState extends RootState {}

export interface ToastRootBaseProps extends PolymorphicProps<'div', ToastRootState> {}
export interface ToastRootProps extends HTMLProps<'div'>, ToastRootBaseProps {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getRootProps(), props)

  return (
    <ark.div {...mergedProps} state={toast().getRootState()}>
      <ark.div {...toast().getGhostBeforeProps()} />
      {props.children}
      <ark.div {...toast().getGhostAfterProps()} />
    </ark.div>
  )
}

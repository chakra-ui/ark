import type { ComponentProps } from 'solid-js'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends ComponentProps<'div'> {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  return (
    <div {...toast().getRootProps()}>
      <div {...toast().getGhostBeforeProps()} />
      {props.children}
      <div {...toast().getGhostAfterProps()} />
    </div>
  )
}

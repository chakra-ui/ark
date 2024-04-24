import type { ComponentProps } from 'solid-js'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends ComponentProps<'div'> {}

export const ToastRoot = (props: ToastRootProps) => {
  const toast = useToastContext()
  return (
    <div {...toast().rootProps}>
      <div {...toast().ghostBeforeProps} />
      {props.children}
      <div {...toast().ghostAfterProps} />
    </div>
  )
}

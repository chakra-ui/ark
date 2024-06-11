import { mergeProps } from '@zag-js/solid'
import type { ComponentProps } from 'solid-js'
import { useToastContext } from './use-toast-context'

export interface ToastRootProps extends ComponentProps<'div'> {}

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

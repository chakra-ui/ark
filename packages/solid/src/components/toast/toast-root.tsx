import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { PolymorphicProps } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastRootBaseProps extends PolymorphicProps<'div'> {}
export interface ToastRootProps extends JSX.HTMLAttributes<HTMLDivElement>, ToastRootBaseProps {}

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

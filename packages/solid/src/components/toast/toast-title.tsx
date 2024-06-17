import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastTitleBaseProps extends PolymorphicProps<'div'> {}
export interface ToastTitleProps extends JSX.HTMLAttributes<HTMLDivElement>, ToastTitleBaseProps {}

export const ToastTitle = (props: ToastTitleProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getTitleProps(), props)

  return <ark.div {...mergedProps} />
}

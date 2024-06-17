import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface ToastDescriptionProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    ToastDescriptionBaseProps {}

export const ToastDescription = (props: ToastDescriptionProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getDescriptionProps(), props)

  return <ark.div {...mergedProps} />
}

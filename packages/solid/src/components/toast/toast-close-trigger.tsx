import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useToastContext } from './use-toast-context'

export interface ToastCloseTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface ToastCloseTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    ToastCloseTriggerBaseProps {}

export const ToastCloseTrigger = (props: ToastCloseTriggerProps) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(() => toast().getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} />
}

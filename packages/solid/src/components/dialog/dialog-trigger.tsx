import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DialogTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    DialogTriggerBaseProps {}

export const DialogTrigger = (props: DialogTriggerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getTriggerProps(),
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    props,
  )

  return <ark.button {...mergedProps} />
}

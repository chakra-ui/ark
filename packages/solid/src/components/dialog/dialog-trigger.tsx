import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogTriggerProps extends HTMLArkProps<'button'> {}

export const DialogTrigger = (props: DialogTriggerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().triggerProps,
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    props,
  )

  return <ark.button {...mergedProps} />
}

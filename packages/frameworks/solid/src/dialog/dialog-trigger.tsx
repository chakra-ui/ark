import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './dialog-context'

export interface DialogTriggerProps extends HTMLArkProps<'button'> {}

export const DialogTrigger = (props: DialogTriggerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().triggerProps,
    () => ({ 'aria-controls': presenceApi().isUnmounted && null }),
    props,
  )

  // @ts-expect-error TODO fix
  return <ark.button {...mergedProps} />
}

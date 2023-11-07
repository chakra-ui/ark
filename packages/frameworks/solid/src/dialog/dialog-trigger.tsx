import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = HTMLArkProps<'button'>

export const DialogTrigger = (props: DialogTriggerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().triggerProps,
    () => ({ 'aria-controls': presenceApi().isUnmounted && null }),
    props,
  )

  // @ts-expect-error we want aria-controls to be null to remove them if the popover if lazy mounted
  return <ark.button {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTriggerProps extends HTMLArkProps<'button'> {}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getTriggerProps(),
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    props,
  )
  return <ark.button {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface PopoverTriggerProps extends HTMLProps<'button'>, PopoverTriggerBaseProps {}

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

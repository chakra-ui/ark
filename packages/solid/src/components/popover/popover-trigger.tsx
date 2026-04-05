import { mergeProps } from '@zag-js/solid'
import type { TriggerProps } from '@zag-js/popover'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'> {}
export interface PopoverTriggerProps extends Assign<HTMLProps<'button'>, PopoverTriggerBaseProps> {}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<TriggerProps>()(props, ['value'])
  const api = usePopoverContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getTriggerProps(triggerProps),
    () => ({ 'aria-controls': presenceApi().unmounted && null }),
    localProps,
  )
  return <ark.button {...mergedProps} />
}

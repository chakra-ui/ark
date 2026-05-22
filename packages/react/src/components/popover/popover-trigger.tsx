'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/popover'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface PopoverTriggerProps extends Assign<HTMLProps<'button'>, PopoverTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const PopoverTrigger = ({ ref, ...props }: PopoverTriggerProps) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const triggerPropsRaw = popover.getTriggerProps(triggerProps)
  const mergedProps = mergeProps(
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
}

PopoverTrigger.displayName = 'PopoverTrigger'

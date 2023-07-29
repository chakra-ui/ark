import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>(
  (props, ref) => {
    const { triggerProps } = useHoverCardContext()
    const mergedProps = mergeProps(triggerProps, props)
    return <ark.button {...mergedProps} ref={ref} />
  },
)

HoverCardTrigger.displayName = 'HoverCardTrigger'

import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseHoverCardProps
  extends Omit<Optional<hoverCard.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the hover card.
   */
  defaultOpen?: hoverCard.Context['open']
}

export interface UseHoverCardReturn extends hoverCard.Api<PropTypes> {}

export const useHoverCard = (props: UseHoverCardProps = {}): UseHoverCardReturn => {
  const initialContext: hoverCard.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    open: props.defaultOpen ?? props.open,
    'open.controlled': props.open !== undefined,
  }

  const context: hoverCard.Context = {
    ...initialContext,
    open: props.open,
    onOpenChange: useEvent(props.onOpenChange, { sync: true }),
  }

  const [state, send] = useMachine(hoverCard.machine(context), { context })

  return hoverCard.connect(state, send, normalizeProps)
}

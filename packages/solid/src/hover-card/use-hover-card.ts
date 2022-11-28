import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import type { Optional } from '../types'

export type UseHoverCardProps = Optional<hoverCard.Context, 'id'>

export const useHoverCard = (props: UseHoverCardProps) => {
  const context = {
    id: createUniqueId(),
    ...props,
  }

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return createMemo(() => hoverCard.connect(state, send, normalizeProps))
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>

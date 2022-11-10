import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { OptionalId } from '../types'

export type UseHoverCardProps = OptionalId<hoverCard.Context>

export const useHoverCard = (props: UseHoverCardProps) => {
  const context = {
    id: useId(),
    ...props,
  }

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return hoverCard.connect(state, send, normalizeProps)
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>

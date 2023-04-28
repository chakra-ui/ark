import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseHoverCardProps = Optional<hoverCard.Context, 'id'>

export const useHoverCard = (props: UseHoverCardProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return hoverCard.connect(state, send, normalizeProps)
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>

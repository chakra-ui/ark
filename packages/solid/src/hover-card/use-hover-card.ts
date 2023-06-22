import * as hoverCard from '@zag-js/hover-card'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseHoverCardProps = Optional<hoverCard.Context, 'id'>

export const useHoverCard = (props: UseHoverCardProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return createMemo(() => hoverCard.connect(state, send, normalizeProps))
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>

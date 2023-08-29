import * as hoverCard from '@zag-js/hover-card'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseHoverCardProps = Optional<hoverCard.Context, 'id'>
export type UseHoverCardReturn = hoverCard.Api<PropTypes>

export const useHoverCard = (props: UseHoverCardProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return createMemo(() => hoverCard.connect(state, send, normalizeProps))
}

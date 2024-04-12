import * as hoverCard from '@zag-js/hover-card'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseHoverCardProps
  extends Omit<Optional<hoverCard.Context, 'id'>, 'open.controlled'> {}
export interface UseHoverCardReturn extends Accessor<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (props: UseHoverCardProps): UseHoverCardReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return createMemo(() => hoverCard.connect(state, send, normalizeProps))
}

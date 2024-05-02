import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseHoverCardProps
  extends Optional<Omit<hoverCard.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {}
export interface UseHoverCardReturn extends Accessor<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (props: UseHoverCardProps): UseHoverCardReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = mergeProps(
    {
      id: createUniqueId(),
      dir: locale().dir,
      getRootNode: environment().getRootNode,
      'open.controlled': props.open !== undefined,
    },
    props,
  )

  const [state, send] = useMachine(hoverCard.machine(context), { context })
  return createMemo(() => hoverCard.connect(state, send, normalizeProps))
}

import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseHoverCardProps = Omit<hoverCard.Context, 'id'>

export const useHoverCard = (props: UseHoverCardProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
  })

  const [state, send] = useMachine(hoverCard.machine(initialContext), { context: initialContext })

  return hoverCard.connect(state, send, normalizeProps)
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>

import * as rating from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseRatingGroupProps = Optional<rating.Context, 'id'>
export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>

export const useRatingGroup = (props: UseRatingGroupProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(rating.machine(context), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

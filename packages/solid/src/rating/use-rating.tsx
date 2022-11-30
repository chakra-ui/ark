import * as rating from '@zag-js/rating'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseRatingProps = Optional<rating.Context, 'id'>
export type UseRatingReturn = ReturnType<typeof useRating>

export const useRating = (props: UseRatingProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(rating.machine(context), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

import * as rating from '@zag-js/rating'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseRatingProps = Optional<rating.Context, 'id'> & {
  defaultValue?: rating.Context['value']
}
export type UseRatingReturn = ReturnType<typeof useRating>

export const useRating = (props: UseRatingProps) => {
  const initialContext = mergeProps({ id: createUniqueId(), value: props.defaultValue }, props)
  const context = mergeProps(initialContext, { value: props.value })

  const [state, send] = useMachine(rating.machine(initialContext), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

import * as rating from '@zag-js/rating'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseRatingProps = Optional<rating.Context, 'id'> & {
  defaultValue?: rating.Context['value']
}
export type UseRatingReturn = ReturnType<typeof useRating>

export const useRating = (props: UseRatingProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(rating.machine(initialContext), {
    context,
  })

  return rating.connect(state, send, normalizeProps)
}

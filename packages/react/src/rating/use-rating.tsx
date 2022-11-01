import * as rating from '@zag-js/rating'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseRatingProps = Omit<rating.Context, 'id'> & { defaultValue?: rating.Context['value'] }
export type UseRatingReturn = ReturnType<typeof useRating>

export const useRating = (props: UseRatingProps) => {
  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value: props.value,
  })

  const [state, send] = useMachine(rating.machine(initialContext), {
    context,
  })

  return rating.connect(state, send, normalizeProps)
}

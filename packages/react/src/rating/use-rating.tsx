import * as rating from '@zag-js/rating'
import { useId } from 'react'
import { normalizeProps, useMachine } from '@zag-js/react'
import { splitProps } from '../split-props'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseRatingProps = Omit<rating.Context, 'id'> & { defaultValue?: rating.Context['value'] }
export type UseRatingReturn = ReturnType<typeof useRating>

export const useRating = (props: UseRatingProps) => {
  const [{ value, defaultValue }, ratingProps, htmlProps] = splitProps(
    props,
    ['value', 'defaultValue'],
    [
      'ids',
      'translations',
      'max',
      'name',
      'readonly',
      'disabled',
      'allowHalf',
      'autoFocus',
      'onChange',
      'onHover',
    ],
  )

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...ratingProps,
    value: value ?? defaultValue,
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value,
  })

  const [state, send] = useMachine(rating.machine(initialContext), {
    context,
  })

  const api = rating.connect(state, send, normalizeProps)
  return { api, htmlProps }
}

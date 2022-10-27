import * as rating from '@zag-js/rating'
import { useId } from 'react'
import { normalizeProps, useMachine } from '@zag-js/react'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UseRatingProps = Omit<rating.Context, 'id'> & { defaultValue?: rating.Context['value'] }
export type UseRatingReturn = ReturnType<typeof useRating>

export const useRating = (props: UseRatingProps) => {
  const {
    ids,
    translations,
    max,
    name,
    value,
    defaultValue,
    readonly,
    disabled,
    allowHalf,
    autoFocus,
    onChange,
    onHover,
    ...htmlProps
  } = props

  const [state, send] = useMachine(
    rating.machine({
      id: useId(),
      ids,
      translations,
      max,
      name,
      value: value || defaultValue,
      readonly,
      disabled,
      allowHalf,
      autoFocus,
      onChange,
      onHover,
    }),
    { context: filterUndefinedEntries({ value }) },
  )

  const api = rating.connect(state, send, normalizeProps)
  return { api, htmlProps }
}

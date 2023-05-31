import * as rating from '@zag-js/rating-group'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseRatingGroupProps = Optional<rating.Context, 'id'>
export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>

export const useRatingGroup = (props: UseRatingGroupProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(rating.machine(context), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

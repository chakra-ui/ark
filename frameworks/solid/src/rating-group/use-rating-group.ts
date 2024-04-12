import * as rating from '@zag-js/rating-group'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseRatingGroupProps extends Optional<rating.Context, 'id'> {}
export interface UseRatingGroupReturn extends Accessor<rating.Api<PropTypes>> {}

export const useRatingGroup = (props: UseRatingGroupProps): UseRatingGroupReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(rating.machine(context), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

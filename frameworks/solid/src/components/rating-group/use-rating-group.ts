import * as rating from '@zag-js/rating-group'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseRatingGroupProps extends Optional<rating.Context, 'id'> {}
export interface UseRatingGroupReturn extends Accessor<rating.Api<PropTypes>> {}

export const useRatingGroup = (props: UseRatingGroupProps): UseRatingGroupReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(rating.machine(context), { context })

  return createMemo(() => rating.connect(state, send, normalizeProps))
}

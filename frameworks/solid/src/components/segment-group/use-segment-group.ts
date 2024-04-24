import * as segment from '@zag-js/radio-group'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseSegmentGroupProps extends Optional<segment.Context, 'id'> {}
export interface UseSegmentGroupReturn extends Accessor<segment.Api<PropTypes>> {}

export const useSegmentGroup = (props: UseSegmentGroupProps): UseSegmentGroupReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(segment.machine(context), { context })

  return createMemo(() => segment.connect(state, send, normalizeProps))
}

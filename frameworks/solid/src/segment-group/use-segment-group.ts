import * as segment from '@zag-js/radio-group'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export interface UseSegmentGroupProps extends Optional<segment.Context, 'id'> {}
export interface UseSegmentGroupReturn extends Accessor<segment.Api<PropTypes>> {}

export const useSegmentGroup = (props: UseSegmentGroupProps): UseSegmentGroupReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(segment.machine(context), { context })

  return createMemo(() => segment.connect(state, send, normalizeProps))
}

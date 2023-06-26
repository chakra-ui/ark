import * as segment from '@zag-js/radio-group'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSegmentGroupProps = Optional<segment.Context, 'id'>
export type UseSegmentGroupReturn = ReturnType<typeof useSegmentGroup>

export const useSegmentGroup = (props: UseSegmentGroupProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(segment.machine(context), { context })

  return createMemo(() => segment.connect(state, send, normalizeProps))
}

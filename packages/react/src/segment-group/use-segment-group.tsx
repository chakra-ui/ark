import * as segmentGroup from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSegmentGroupProps = Optional<segmentGroup.Context, 'id'> & {
  defaultValue?: segmentGroup.Context['value']
}
export type UseSegmentGroupReturn = ReturnType<typeof useSegmentGroup>

export const useSegmentGroup = (props: UseSegmentGroupProps) => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(segmentGroup.machine(initialContext), {
    context,
  })

  return segmentGroup.connect(state, send, normalizeProps)
}

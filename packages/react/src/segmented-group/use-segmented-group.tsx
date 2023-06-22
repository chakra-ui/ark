import * as segmentedGroup from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSegmentedGroupProps = Optional<segmentedGroup.Context, 'id'> & {
  defaultValue?: segmentedGroup.Context['value']
}
export type UseSegmentedGroupReturn = ReturnType<typeof useSegmentedGroup>

export const useSegmentedGroup = (props: UseSegmentedGroupProps) => {
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

  const [state, send] = useMachine(segmentedGroup.machine(initialContext), {
    context,
  })

  return segmentedGroup.connect(state, send, normalizeProps)
}

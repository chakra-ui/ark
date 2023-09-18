import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as toggleGroup from '@zag-js/toggle-group'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseToggleGroupProps = Optional<toggleGroup.Context, 'id'>
export type UseToggleGroupReturn = Accessor<toggleGroup.Api<PropTypes>>

export const useToggleGroup = (props: UseToggleGroupProps): UseToggleGroupReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(toggleGroup.machine(context), {
    context,
  })

  return createMemo(() => toggleGroup.connect(state, send, normalizeProps))
}

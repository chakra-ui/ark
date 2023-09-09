import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as toggle from '@zag-js/toggle'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseToggleProps = Optional<toggle.Context, 'id'>
export type UseToggleReturn = Accessor<toggle.Api<PropTypes>>

export const useToggle = (props: UseToggleProps): UseToggleReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(toggle.machine(context), { context })

  return createMemo(() => toggle.connect(state, send, normalizeProps))
}

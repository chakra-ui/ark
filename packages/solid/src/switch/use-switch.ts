import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as zagSwitch from '@zag-js/switch'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSwitchProps = Optional<zagSwitch.Context, 'id'>
export type UseSwitchReturn = Accessor<zagSwitch.Api<PropTypes>>

export const useSwitch = (props: UseSwitchProps): UseSwitchReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(zagSwitch.machine(context), { context })

  return createMemo(() => zagSwitch.connect(state, send, normalizeProps))
}

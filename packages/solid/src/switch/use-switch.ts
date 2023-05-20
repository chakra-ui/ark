import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as zagSwitch from '@zag-js/switch'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSwitchProps = Optional<zagSwitch.Context, 'id'>
export type UseSwitchReturn = ReturnType<typeof useSwitch>

export const useSwitch = (props: UseSwitchProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(zagSwitch.machine(context), { context })

  return createMemo(() => zagSwitch.connect(state, send, normalizeProps))
}

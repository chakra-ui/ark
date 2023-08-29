import { normalizeProps, useMachine } from '@zag-js/react'
import * as zagSwitch from '@zag-js/switch'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSwitchProps = Optional<zagSwitch.Context, 'id'> & { defaultChecked?: boolean }
export type UseSwitchReturn = zagSwitch.Api

export const useSwitch = (props: UseSwitchProps): UseSwitchReturn => {
  const getRootNode = useEnvironmentContext()

  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    checked: props.defaultChecked,
  }
  const context = {
    ...initialContext,
    checked: props.checked,
  }

  const [state, send] = useMachine(zagSwitch.machine(initialContext), { context })
  return zagSwitch.connect(state, send, normalizeProps)
}

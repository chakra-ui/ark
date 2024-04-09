import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import * as zagSwitch from '@zag-js/switch'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseSwitchProps extends Optional<zagSwitch.Context, 'id'> {
  /**
   * The initial checked state of the switch.
   */
  defaultChecked?: zagSwitch.Context['checked']
}

export interface UseSwitchReturn extends zagSwitch.Api<PropTypes> {}

export const useSwitch = (props: UseSwitchProps): UseSwitchReturn => {
  const initialContext: zagSwitch.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    checked: props.defaultChecked,
  }

  const context: zagSwitch.Context = {
    ...initialContext,
    checked: props.checked,
    onCheckedChange: useEvent(props.onCheckedChange, { sync: true }),
  }

  const [state, send] = useMachine(zagSwitch.machine(initialContext), { context })

  return zagSwitch.connect(state, send, normalizeProps)
}

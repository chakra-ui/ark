import { normalizeProps, useMachine } from '@zag-js/react'
import * as zagSwitch from '@zag-js/switch'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseSwitchProps = Optional<zagSwitch.Context, 'id'>

export const useSwitch = (props: UseSwitchProps) => {
  const getRootNode = useEnvironmentContext()

  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(zagSwitch.machine(context), { context })
  return zagSwitch.connect(state, send, normalizeProps)
}

export type UseSwitchReturn = ReturnType<typeof useSwitch>

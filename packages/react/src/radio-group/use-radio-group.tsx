import * as radio from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseRadioGroupProps extends Optional<radio.Context, 'id'> {
  defaultValue?: radio.Context['value']
}
export type UseRadioGroupReturn = radio.Api

export const useRadioGroup = (props: UseRadioGroupProps): UseRadioGroupReturn => {
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

  const [state, send] = useMachine(radio.machine(initialContext), {
    context,
  })

  return radio.connect(state, send, normalizeProps)
}

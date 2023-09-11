import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseNumberInputProps extends Optional<numberInput.Context, 'id'> {
  defaultValue?: numberInput.Context['value']
}
export type UseNumberInputReturn = numberInput.Api

export const useNumberInput = (props: UseNumberInputProps): UseNumberInputReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext: numberInput.Context = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }
  const context: numberInput.Context = {
    ...initialContext,
    value: props.value,
    onChange: useEvent(props.onChange, { sync: true }),
  }

  const [state, send] = useMachine(numberInput.machine(initialContext), { context })
  return numberInput.connect(state, send, normalizeProps)
}

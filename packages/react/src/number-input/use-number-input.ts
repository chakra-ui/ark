import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { OptionalId } from '../types'

export type UseNumberInputProps = OptionalId<numberInput.Context> & {
  defaultValue?: numberInput.Context['value']
}

export const useNumberInput = (props: UseNumberInputProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(numberInput.machine(initialContext), { context })
  return numberInput.connect(state, send, normalizeProps)
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>

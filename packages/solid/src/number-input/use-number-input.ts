import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseNumberInputProps = Optional<numberInput.Context, 'id'> & {
  defaultValue?: numberInput.Context['value']
}

export const useNumberInput = (props: UseNumberInputProps) => {
  const initialContext = mergeProps({ id: createUniqueId(), value: props.defaultValue }, props)
  const context = mergeProps(initialContext, { value: props.value })

  const [state, send] = useMachine(numberInput.machine(initialContext), { context })

  return createMemo(() => numberInput.connect(state, send, normalizeProps))
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>

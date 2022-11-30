import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseNumberInputProps = Optional<numberInput.Context, 'id'>

export const useNumberInput = (props: UseNumberInputProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(numberInput.machine(context), { context })

  return createMemo(() => numberInput.connect(state, send, normalizeProps))
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>

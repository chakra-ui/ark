import * as numberInput from '@zag-js/number-input'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseNumberInputProps = Optional<numberInput.Context, 'id'>

export const useNumberInput = (props: UseNumberInputProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(numberInput.machine(context), { context })

  return createMemo(() => numberInput.connect(state, send, normalizeProps))
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>

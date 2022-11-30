import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseCheckboxProps = Optional<checkbox.Context, 'id'>
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

export const useCheckbox = (props: UseCheckboxProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(checkbox.machine(context), { context })

  return createMemo(() => checkbox.connect(state, send, normalizeProps))
}

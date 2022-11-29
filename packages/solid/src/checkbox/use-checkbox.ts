import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseCheckboxProps = Optional<checkbox.Context, 'id'> & {
  defaultValue?: checkbox.Context['value']
}
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

export const useCheckbox = (props: UseCheckboxProps) => {
  const initialContext = mergeProps({ id: createUniqueId(), value: props.defaultValue }, props)
  const context = mergeProps(initialContext, { value: props.value })

  const [state, send] = useMachine(checkbox.machine(initialContext), { context })

  return createMemo(() => checkbox.connect(state, send, normalizeProps))
}

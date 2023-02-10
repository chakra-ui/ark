import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'
import type { Optional } from '../types'

export type UseComboboxProps = Optional<combobox.Context, 'id'>
export type UseComboboxReturn = ReturnType<typeof useCombobox>

export const useCombobox = (props: UseComboboxProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(combobox.machine(context), { context })

  return createMemo(() => combobox.connect(state, send, normalizeProps))
}

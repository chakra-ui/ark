import * as combobox from '@zag-js/combobox'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseComboboxProps = Optional<combobox.Context, 'id'>
export type UseComboboxReturn = ReturnType<typeof useCombobox>

export const useCombobox = (props: UseComboboxProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(combobox.machine(context), { context })

  return createMemo(() => combobox.connect(state, send, normalizeProps))
}

import * as combobox from '@zag-js/combobox'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseComboboxProps = Optional<combobox.Context, 'id'>
export type UseComboboxReturn = Accessor<combobox.Api<PropTypes>>

export const useCombobox = (props: UseComboboxProps): UseComboboxReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(combobox.machine(context), { context })

  return createMemo(() => combobox.connect(state, send, normalizeProps))
}

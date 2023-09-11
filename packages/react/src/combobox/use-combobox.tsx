import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { type Optional } from '../types'

export interface UseComboboxProps extends Optional<combobox.Context, 'id'> {}
export type UseComboboxReturn = combobox.Api

export const useCombobox = (props: UseComboboxProps): UseComboboxReturn => {
  const context = {
    ...props,
    id: useId(),
  }

  const [state, send] = useMachine(combobox.machine(context), { context })
  return combobox.connect(state, send, normalizeProps)
}

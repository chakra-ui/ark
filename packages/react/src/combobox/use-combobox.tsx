import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseComboboxProps = Optional<combobox.Context, 'id'>

export const useCombobox = (props: UseComboboxProps) => {
  const context = {
    ...props,
    id: useId(),
  }

  const [state, send] = useMachine(combobox.machine(context), { context })
  return combobox.connect(state, send, normalizeProps)
}

export type UseComboboxReturn = ReturnType<typeof useCombobox>

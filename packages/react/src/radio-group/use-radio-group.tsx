import * as radio from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseRadioGroupProps = Optional<radio.Context, 'id'> & {
  defaultValue?: radio.Context['value']
}
export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(radio.machine(initialContext), {
    context,
  })

  return radio.connect(state, send, normalizeProps)
}

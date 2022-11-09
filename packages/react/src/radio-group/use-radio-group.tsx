import * as radio from '@zag-js/radio'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseRadioGroupProps = Omit<radio.Context, 'id'> & {
  defaultValue?: radio.Context['value']
}
export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>

export const useRadioGroup = (props: UseRadioGroupProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
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

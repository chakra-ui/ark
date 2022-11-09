import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UseCheckboxProps = Omit<checkbox.Context, 'id'> & {
  defaultValue?: checkbox.Context['value']
}
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

export const useCheckbox = (props: UseCheckboxProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.value ?? props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(checkbox.machine(initialContext), { context })

  return checkbox.connect(state, send, normalizeProps)
}

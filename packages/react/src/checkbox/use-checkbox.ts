import { connect, Context, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { Optional } from '../types'

export type UseCheckboxProps = Optional<Context, 'id'> & {
  defaultValue?: Context['value']
}
export type UseCheckboxReturn = ReturnType<typeof useCheckbox>

export const useCheckbox = (props: UseCheckboxProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.defaultValue,
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(machine(initialContext), { context })
  return connect(state, send, normalizeProps)
}

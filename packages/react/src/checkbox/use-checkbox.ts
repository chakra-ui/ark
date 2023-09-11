import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseCheckboxProps extends Optional<checkbox.Context, 'id'> {
  defaultChecked?: checkbox.Context['checked']
}
export type UseCheckboxReturn = checkbox.Api

export const useCheckbox = (props: UseCheckboxProps): UseCheckboxReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    checked: props.defaultChecked,
  }
  const context = {
    ...initialContext,
    checked: props.checked,
  }
  const [state, send] = useMachine(checkbox.machine(initialContext), { context })

  return checkbox.connect(state, send, normalizeProps)
}

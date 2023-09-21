import * as checkbox from '@zag-js/checkbox'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseCheckboxProps extends Optional<checkbox.Context, 'id'> {
  /**
   * The initial checked state of the checkbox.
   */
  defaultChecked?: checkbox.Context['checked']
}

export interface UseCheckboxReturn extends checkbox.Api<PropTypes> {}

export const useCheckbox = (props: UseCheckboxProps = {}): UseCheckboxReturn => {
  const initialContext: checkbox.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    checked: props.defaultChecked,
  }

  const context: checkbox.Context = {
    ...initialContext,
    checked: props.checked,
    onCheckedChange: useEvent(props.onCheckedChange, { sync: true }),
  }

  const [state, send] = useMachine(checkbox.machine(initialContext), { context })

  return checkbox.connect(state, send, normalizeProps)
}

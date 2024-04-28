import * as checkbox from '@zag-js/checkbox'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseCheckboxProps
  extends Optional<Omit<checkbox.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the checkbox when it is first rendered.
   * Use this when you do not need to control the state of the checkbox.
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

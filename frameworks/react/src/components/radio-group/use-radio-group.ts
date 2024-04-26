import * as radio from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseRadioGroupProps
  extends Optional<Omit<radio.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the radio group.
   */
  defaultValue?: radio.Context['value']
}

export interface UseRadioGroupReturn extends radio.Api<PropTypes> {}

export const useRadioGroup = (props: UseRadioGroupProps): UseRadioGroupReturn => {
  const initialContext: radio.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: radio.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
  }

  const [state, send] = useMachine(radio.machine(initialContext), {
    context,
  })

  return radio.connect(state, send, normalizeProps)
}

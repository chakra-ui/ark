import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseColorPickerProps extends Optional<colorPicker.Context, 'id'> {
  /**
   * The initial value of the color picker.
   */
  defaultValue?: colorPicker.Context['value']
}

export interface UseColorPickerReturn extends colorPicker.Api<PropTypes> {}

export const useColorPicker = (props: UseColorPickerProps = {}): UseColorPickerReturn => {
  const initialContext: colorPicker.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: colorPicker.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
  }

  const [state, send] = useMachine(colorPicker.machine(initialContext), { context })
  return colorPicker.connect(state, send, normalizeProps)
}

import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseColorPickerProps
  extends Omit<Optional<Omit<colorPicker.Context, 'value'>, 'id'>, 'open.controlled'> {
  /**
   * The initial value of the color picker.
   */
  defaultValue?: string
  /**
   * The current value of the color picker.
   */
  value?: string
}

export interface UseColorPickerReturn extends colorPicker.Api<PropTypes> {}

export const useColorPicker = (props: UseColorPickerProps): UseColorPickerReturn => {
  const initialContext: colorPicker.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue ? colorPicker.parse(props.defaultValue) : undefined,
    'open.controlled': props.open !== undefined,
  }

  const context: colorPicker.Context = {
    ...initialContext,
    value: props.value ? colorPicker.parse(props.value) : undefined,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueChangeEnd: useEvent(props.onValueChangeEnd),
  }

  const [state, send] = useMachine(colorPicker.machine(initialContext), { context })
  return colorPicker.connect(state, send, normalizeProps)
}

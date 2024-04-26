import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseColorPickerProps
  extends Optional<
    Omit<colorPicker.Context, 'value' | 'open.controlled' | 'dir' | 'getRootNode'>,
    'id'
  > {
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

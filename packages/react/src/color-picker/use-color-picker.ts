import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useEvent } from '../use-event'

export interface UseColorPickerProps extends Optional<colorPicker.Context, 'id'> {
  defaultValue?: colorPicker.Context['value']
}
export type UseColorPickerReturn = colorPicker.Api

export const useColorPicker = (props: UseColorPickerProps): UseColorPickerReturn => {
  const getRootNode = useEnvironmentContext()
  const initialContext: colorPicker.Context = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue ?? props.value,
  }
  const context: colorPicker.Context = {
    ...initialContext,
    value: props.value,
    onChange: useEvent(props.onChange, { sync: true }),
  }

  const [state, send] = useMachine(colorPicker.machine(initialContext), { context })
  return colorPicker.connect(state, send, normalizeProps)
}

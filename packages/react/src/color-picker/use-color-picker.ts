import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export type UseColorPickerProps = Optional<colorPicker.Context, 'id'>
export type UseColorPickerReturn = ReturnType<typeof useColorPicker>

export const useColorPicker = (props: UseColorPickerProps) => {
  const getRootNode = useEnvironmentContext()
  const context = {
    id: useId(),
    getRootNode,
    ...props,
  }

  const [state, send] = useMachine(colorPicker.machine(context), { context })
  return colorPicker.connect(state, send, normalizeProps)
}

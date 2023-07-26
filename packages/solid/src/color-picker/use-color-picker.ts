import * as colorPicker from '@zag-js/color-picker'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseColorPickerProps = Optional<colorPicker.Context, 'id'>
export type UseColorPickerReturn = ReturnType<typeof useColorPicker>

export const useColorPicker = (props: UseColorPickerProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(colorPicker.machine(context), { context })
  return createMemo(() => colorPicker.connect(state, send, normalizeProps))
}

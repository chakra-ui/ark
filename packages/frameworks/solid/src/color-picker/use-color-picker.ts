import * as colorPicker from '@zag-js/color-picker'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseColorPickerProps = Optional<colorPicker.Context, 'id'>
export type UseColorPickerReturn = Accessor<colorPicker.Api<PropTypes>>

export const useColorPicker = (props: UseColorPickerProps): UseColorPickerReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(colorPicker.machine(context), { context })
  return createMemo(() => colorPicker.connect(state, send, normalizeProps))
}

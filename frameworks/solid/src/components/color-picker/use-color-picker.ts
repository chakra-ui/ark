import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId, splitProps } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseColorPickerProps
  extends Omit<Optional<Omit<colorPicker.Context, 'value'>, 'id'>, 'open.controlled'> {
  /**
   * The current value of the color picker.
   */
  value?: string
}
export interface UseColorPickerReturn extends Accessor<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (props: UseColorPickerProps): UseColorPickerReturn => {
  const [local, rest] = splitProps(props, ['value'])
  const getRootNode = useEnvironmentContext()
  const context = mergeProps(
    () => ({
      id: createUniqueId(),
      getRootNode,
      'open.controlled': props.open !== undefined,
      value: local.value ? colorPicker.parse(local.value) : undefined,
    }),
    rest,
  )
  const [state, send] = useMachine(colorPicker.machine(context), { context })

  return createMemo(() => colorPicker.connect(state, send, normalizeProps))
}

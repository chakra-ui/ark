import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useFieldContext } from '../field'

export interface UseColorPickerProps
  extends Optional<Omit<colorPicker.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the color picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: colorPicker.Context['open']
  /**
   * The initial value of the color picker when it is first rendered.
   * Use when you do not need to control the state of the color picker.
   */
  defaultValue?: colorPicker.Context['value']
}
export interface UseColorPickerReturn extends Accessor<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (props: UseColorPickerProps = {}): UseColorPickerReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      input: field?.().ids.control,
    },
    dir: locale().dir,
    disabled: field?.().disabled,
    invalid: field?.().invalid,
    readOnly: field?.().readOnly,
    required: field?.().required,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    value: props.defaultValue,
    ...props,
  }))
  const [state, send] = useMachine(colorPicker.machine(context()), { context })

  return createMemo(() => colorPicker.connect(state, send, normalizeProps))
}

import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseDatePickerProps
  extends Optional<
    Omit<datePicker.Context, 'dir' | 'getRootNode' | 'parse' | 'open.controlled'>,
    'id'
  > {
  /**
   * The initial open state of the date picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: datePicker.Context['open']
  /**
   * The initial value of the date picker when it is first rendered.
   * Use when you do not need to control the state of the date picker.
   */
  defaultValue?: datePicker.Context['value']
}
export interface UseDatePickerReturn extends Accessor<datePicker.Api<PropTypes>> {}

export const useDatePicker = (props: UseDatePickerProps = {}): UseDatePickerReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    value: props.defaultValue,
    ...props,
  }))

  const [state, send] = useMachine(datePicker.machine(context()), { context })

  return createMemo(() => datePicker.connect(state, send, normalizeProps))
}

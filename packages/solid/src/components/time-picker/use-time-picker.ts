import { parseTime } from '@internationalized/date'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as timePicker from '@zag-js/time-picker'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTimePickerProps
  extends Optional<
    Omit<timePicker.Context, 'dir' | 'getRootNode' | 'min' | 'max' | 'open.controlled' | 'value'>,
    'id'
  > {
  /**
   * The initial open state of the time picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: timePicker.Context['open']
  /**
   * The initial value of the time picker when it is first rendered.
   * Use when you do not need to control the state of the time picker.
   */
  defaultValue?: string
  /**
   * The minimum time that can be selected.
   */
  min?: string
  /**
   * The maximum time that can be selected.
   */
  max?: string
  /**
   * The value of the time picker
   */
  value?: string
}

export interface UseTimePickerReturn extends Accessor<timePicker.Api<PropTypes>> {}

export const useTimePicker = (props: UseTimePickerProps = {}): UseTimePickerReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    open: props.defaultOpen,
    'open.controlled': props.open !== undefined,
    ...props,
    value: props.defaultValue ? parseTime(props.defaultValue) : undefined,
    min: props.min ? parseTime(props.min) : undefined,
    max: props.max ? parseTime(props.max) : undefined,
  }))

  const [state, send] = useMachine(timePicker.machine(context()), { context })

  return createMemo(() => timePicker.connect(state, send, normalizeProps))
}

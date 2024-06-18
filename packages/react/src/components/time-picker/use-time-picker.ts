import type { Time } from '@internationalized/date'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as timePicker from '@zag-js/time-picker'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTimePickerProps
  extends Optional<
    Omit<timePicker.Context, 'collection' | 'dir' | 'getRootNode' | 'open.controlled'>,
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
  defaultValue?: Time
}

export interface UseTimePickerReturn extends timePicker.Api<PropTypes> {}

export const useTimePicker = (props: UseTimePickerProps = {}): UseTimePickerReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()

  const initialContext: timePicker.Context = {
    id: useId(),
    dir,
    getRootNode,
    open: props.defaultOpen,
    value: props.defaultValue,
    'open.controlled': props.open !== undefined,
    ...props,
  }

  const context: timePicker.Context = {
    ...initialContext,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onFocusChange: useEvent(props.onFocusChange),
    onOpenChange: useEvent(props.onOpenChange),
  }

  const [state, send] = useMachine(timePicker.machine(initialContext), { context })

  return timePicker.connect(state, send, normalizeProps)
}

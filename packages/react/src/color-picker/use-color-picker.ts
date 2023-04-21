import * as colorPicker from '@zag-js/color-picker'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useCallback, useId } from 'react'
import { flushSync } from 'react-dom'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'

export type UseColorPickerProps = Optional<colorPicker.Context, 'id'> & {
  defaultValue?: colorPicker.Context['value']
}
export type UseColorPickerReturn = ReturnType<typeof useColorPicker>

type ChangeDetails = Parameters<NonNullable<colorPicker.Context['onChange']>>[0]

export const useColorPicker = (props: UseColorPickerProps) => {
  const getRootNode = useEnvironmentContext()
  const initialContext = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue ?? props.value,
  }
  const onChange = props.onChange

  const onChangeWithFlushSync = useCallback(
    (e: ChangeDetails) => flushSync(() => onChange?.(e)),
    [onChange],
  )

  const context: colorPicker.Context = {
    ...initialContext,
    value: props.value,
    onChange: onChangeWithFlushSync,
  }

  const [state, send] = useMachine(colorPicker.machine(initialContext), { context })
  return colorPicker.connect(state, send, normalizeProps)
}

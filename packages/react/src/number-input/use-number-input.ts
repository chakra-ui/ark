import * as numberInput from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useCallback, useId } from 'react'
import { flushSync } from 'react-dom'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UseNumberInputProps = Optional<numberInput.Context, 'id'> & {
  defaultValue?: numberInput.Context['value']
}

type ChangeDetails = Parameters<NonNullable<numberInput.Context['onChange']>>[0]

export const useNumberInput = (props: UseNumberInputProps) => {
  const getRootNode = useEnvironmentContext()
  const initialContext: numberInput.Context = {
    id: useId(),
    getRootNode,
    ...props,
    value: props.defaultValue,
  }

  const onChange = props.onChange

  const onChangeWithFlushSync = useCallback(
    (e: ChangeDetails) => flushSync(() => onChange?.(e)),
    [onChange],
  )

  const context: numberInput.Context = {
    ...initialContext,
    value: props.value,
    onChange: onChangeWithFlushSync,
  }

  const [state, send] = useMachine(numberInput.machine(initialContext), { context })
  return numberInput.connect(state, send, normalizeProps)
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>

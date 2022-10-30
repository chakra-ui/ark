import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { splitProps } from '../split-props'
import { filterUndefinedEntries } from '../filter-undefined-entries'

export type UsePinInputProps = Omit<pinInput.Context, 'id'> & {
  defaultValue?: pinInput.Context['value']
}

export const usePinInput = (props: UsePinInputProps) => {
  const [{ value, defaultValue }, pinInputProps, htmlProps] = splitProps(
    props,
    ['value', 'defaultValue'],
    [
      'autoFocus',
      'blurOnComplete',
      'dir',
      'disabled',
      'getRootNode',
      'ids',
      'invalid',
      'mask',
      'name',
      'onChange',
      'onComplete',
      'onInvalid',
      'otp',
      'pattern',
      'placeholder',
      'translations',
      'type',
    ],
  )

  const initialContext = filterUndefinedEntries({
    id: useId(),
    ...pinInputProps,
    value: value ?? defaultValue ?? [],
  })

  const context = filterUndefinedEntries({
    ...initialContext,
    value,
  })

  const [state, send] = useMachine(pinInput.machine(initialContext), { context })

  const api = pinInput.connect(state, send, normalizeProps)
  return { api, htmlProps }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

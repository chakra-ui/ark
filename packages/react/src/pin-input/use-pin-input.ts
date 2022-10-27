import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UsePinInputProps = Omit<pinInput.Context, 'id'>

export const usePinInput = (props: UsePinInputProps) => {
  const {
    autoFocus,
    blurOnComplete,
    dir,
    disabled,
    getRootNode,
    ids,
    invalid,
    mask,
    name,
    onChange,
    onComplete,
    onInvalid,
    otp,
    pattern,
    placeholder,
    translations,
    type,
    value,
    ...htmlProps
  } = props
  const [state, send] = useMachine(
    pinInput.machine({
      id: useId(),
      autoFocus,
      blurOnComplete,
      dir,
      disabled,
      getRootNode,
      ids,
      invalid,
      mask,
      name,
      onChange,
      onComplete,
      onInvalid,
      otp,
      pattern,
      placeholder,
      translations,
      type,
      value: value ?? [],
    }),
  )

  const api = pinInput.connect(state, send, normalizeProps)
  return { api, htmlProps }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

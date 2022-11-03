import { splitProps, type JSX } from 'solid-js'
import type { Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<JSX.HTMLAttributes<HTMLDivElement>, UsePinInputProps>

export const PinInput = (props: PinInputProps) => {
  const [pinInputProps, htmlProps] = splitProps(props, [
    'autoFocus',
    'blurOnComplete',
    'defaultValue',
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
    'value',
  ])
  const pinInput = usePinInput(pinInputProps)
  return (
    <PinInputProvider value={pinInput}>
      <div {...pinInput?.().rootProps} {...htmlProps} />
    </PinInputProvider>
  )
}

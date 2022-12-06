import type { Assign } from '@polymorphic-factory/solid'
import { splitProps } from 'solid-js'
import { ark, HTMLArkProps } from '../factory'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLArkProps<'div'>, UsePinInputProps>

export const PinInput = (props: PinInputProps) => {
  const [pinInputProps, htmlProps] = splitProps(props, [
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
    'value',
  ])
  const pinInput = usePinInput(pinInputProps)
  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...pinInput?.().rootProps} {...htmlProps} />
    </PinInputProvider>
  )
}

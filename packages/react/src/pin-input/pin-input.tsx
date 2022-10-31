import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { splitProps, type Assign } from '../split-props'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLAtlasProps<'div'>, UsePinInputProps>

export const PinInput = forwardRef<'div', PinInputProps>((props, ref) => {
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
  const { api } = usePinInput(pinInputProps)

  return (
    <PinInputProvider value={api}>
      <atlas.div {...api.rootProps} {...htmlProps} ref={ref} />
    </PinInputProvider>
  )
})

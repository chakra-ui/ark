import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLAtlasProps<'div'>, UsePinInputProps>

export const PinInput = forwardRef<'div', PinInputProps>((props, ref) => {
  const [usePinInputProps, rootProps] = splitProps(props, [
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
  const pinInput = usePinInput(usePinInputProps)

  return (
    <PinInputProvider value={pinInput}>
      <atlas.div {...pinInput.rootProps} {...rootProps} ref={ref} />
    </PinInputProvider>
  )
})

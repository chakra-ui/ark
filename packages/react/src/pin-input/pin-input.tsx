import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLAtlasProps<'div'>, UsePinInputProps>

export const PinInput = forwardRef<'div', PinInputProps>((props, ref) => {
  const [usePinInputProps, divProps] = splitProps(props, [
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
  const mergedProps = mergeProps(pinInput.rootProps, divProps)

  return (
    <PinInputProvider value={pinInput}>
      <atlas.div {...mergedProps} ref={ref} />
    </PinInputProvider>
  )
})

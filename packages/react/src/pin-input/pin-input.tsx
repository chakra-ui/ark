import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { splitProps } from '../split-props'
import type { Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLArkProps<'div'>, UsePinInputProps>

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
      <ark.div {...mergedProps} ref={ref} />
    </PinInputProvider>
  )
})

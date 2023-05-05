import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { type Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, type UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLArkProps<'div'>, UsePinInputProps>

export const PinInput = forwardRef<'div', UsePinInputProps>((props, ref) => {
  const [usePinInputProps, divProps] = createSplitProps<UsePinInputProps>()(props, [
    'autoFocus',
    'blurOnComplete',
    'defaultValue',
    'dir',
    'disabled',
    'form',
    'getRootNode',
    'id',
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
    'selectOnFocus',
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

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, type UsePinInputProps } from './use-pin-input'

export interface PinInputProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
  const [usePinInputProps, localProps] = createSplitProps<UsePinInputProps>()(props, [
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
    'onValueChange',
    'onValueComplete',
    'onValueInvalid',
    'otp',
    'pattern',
    'placeholder',
    'selectOnFocus',
    'translations',
    'type',
    'value',
  ])
  const api = usePinInput(usePinInputProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  return (
    <PinInputProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
      <input {...api.hiddenInputProps} />
    </PinInputProvider>
  )
})

PinInput.displayName = 'PinInput'

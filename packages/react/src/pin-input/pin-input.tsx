import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import { type Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, type UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HtmlArkProps<'div'>, UsePinInputProps>

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
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
  const api = usePinInput(usePinInputProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <PinInputProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
      <input {...api.hiddenInputProps} />
    </PinInputProvider>
  )
})

PinInput.displayName = 'PinInput'

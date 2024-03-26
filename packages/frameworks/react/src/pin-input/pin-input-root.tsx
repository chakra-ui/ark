import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { usePinInput, type UsePinInputProps } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

export interface PinInputRootProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInputRoot = forwardRef<HTMLDivElement, PinInputRootProps>((props, ref) => {
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
  const context = usePinInput(usePinInputProps)
  const mergedProps = mergeProps(context.rootProps, localProps)

  return (
    <PinInputProvider value={context}>
      <ark.div {...mergedProps} ref={ref} />
      <input {...context.hiddenInputProps} />
    </PinInputProvider>
  )
})

PinInputRoot.displayName = 'PinInputRoot'

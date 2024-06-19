import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UsePinInputProps, usePinInput } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

export interface PinInputRootBaseProps extends UsePinInputProps, PolymorphicProps {}
export interface PinInputRootProps extends Assign<HTMLProps<'div'>, PinInputRootBaseProps> {}

export const PinInputRoot = forwardRef<HTMLDivElement, PinInputRootProps>((props, ref) => {
  const [usePinInputProps, localProps] = createSplitProps<UsePinInputProps>()(props, [
    'autoFocus',
    'blurOnComplete',
    'defaultValue',
    'disabled',
    'form',
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
  const pinInput = usePinInput(usePinInputProps)
  const mergedProps = mergeProps(pinInput.getRootProps(), localProps)

  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...mergedProps} ref={ref} />
    </PinInputProvider>
  )
})

PinInputRoot.displayName = 'PinInputRoot'

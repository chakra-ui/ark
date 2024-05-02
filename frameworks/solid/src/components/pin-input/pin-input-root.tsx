import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UsePinInputProps, usePinInput } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

export interface PinInputRootProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInputRoot = (props: PinInputRootProps) => {
  const [usePinInputProps, localProps] = createSplitProps<UsePinInputProps>()(props, [
    'autoFocus',
    'blurOnComplete',
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
  const mergedProps = mergeProps(() => pinInput().rootProps, localProps)

  return (
    <PinInputProvider value={pinInput}>
      <ark.div {...mergedProps} />
    </PinInputProvider>
  )
}

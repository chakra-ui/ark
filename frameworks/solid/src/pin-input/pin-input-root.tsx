import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInput, type UsePinInputProps } from './use-pin-input'
import { PinInputProvider } from './use-pin-input-context'

export interface PinInputRootProps extends Assign<HTMLArkProps<'div'>, UsePinInputProps> {}

export const PinInputRoot = (props: PinInputRootProps) => {
  const [usePinInputProps, localProps] = createSplitProps<UsePinInputProps>()(props, [
    'autoFocus',
    'blurOnComplete',
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
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <PinInputProvider value={api}>
      <ark.div {...mergedProps} />
      <input {...api().hiddenInputProps} />
    </PinInputProvider>
  )
}

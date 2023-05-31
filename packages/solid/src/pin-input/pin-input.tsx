import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { PinInputProvider } from './pin-input-context'
import { usePinInput, type UsePinInputProps } from './use-pin-input'

export type PinInputProps = Assign<HTMLArkProps<'div'>, UsePinInputProps>

export const PinInput = (props: PinInputProps) => {
  const [pinInputProps, htmlProps] = createSplitProps<UsePinInputProps>()(props, [
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

  const api = usePinInput(pinInputProps)

  const rootProps = mergeProps(() => api().rootProps, htmlProps)

  return (
    <PinInputProvider value={api}>
      <ark.div {...rootProps} />
    </PinInputProvider>
  )
}

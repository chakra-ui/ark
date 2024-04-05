import type { InputProps } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputInputProps extends Assign<HTMLArkProps<'input'>, InputProps> {}

export const PinInputInput = (props: PinInputInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} />
}

import type { InputProps } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputInputBaseProps extends InputProps, PolymorphicProps<'input'> {}
export interface PinInputInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    PinInputInputBaseProps {}

export const PinInputInput = (props: PinInputInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} />
}

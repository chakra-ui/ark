import type { InputProps } from '@zag-js/pin-input'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePinInputContext } from './use-pin-input-context.ts'

export interface PinInputInputBaseProps extends InputProps, PolymorphicProps<'input'> {}
export interface PinInputInputProps extends HTMLProps<'input'>, PinInputInputBaseProps {}

export const PinInputInput = (props: PinInputInputProps) => {
  const [inputProps, localProps] = createSplitProps<InputProps>()(props, ['index'])
  const api = usePinInputContext()
  const mergedProps = mergeProps(() => api().getInputProps(inputProps), localProps)

  return <ark.input {...mergedProps} />
}

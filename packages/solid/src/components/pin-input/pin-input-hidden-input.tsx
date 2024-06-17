import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface PinInputHiddenInputProps
  extends HTMLProps<'input'>,
    PinInputHiddenInputBaseProps {}

export const PinInputHiddenInput = (props: PinInputHiddenInputProps) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(() => pinInput().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}

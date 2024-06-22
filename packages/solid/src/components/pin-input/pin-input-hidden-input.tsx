import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface PinInputHiddenInputProps
  extends HTMLProps<'input'>,
    PinInputHiddenInputBaseProps {}

export const PinInputHiddenInput = (props: PinInputHiddenInputProps) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(() => pinInput().getHiddenInputProps(), props)
  const field = useFieldContext()

  return <ark.input aria-describedby={field?.ariaDescribedby} {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputBaseProps extends PolymorphicProps<'input'> {}
export interface PinInputHiddenInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement>,
    PinInputHiddenInputBaseProps {}

export const PinInputHiddenInput = (props: PinInputHiddenInputProps) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(() => pinInput().getHiddenInputProps(), props)

  return <ark.input {...mergedProps} />
}

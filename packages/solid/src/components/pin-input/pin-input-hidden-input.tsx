import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { usePinInputContext } from './use-pin-input-context'

export interface PinInputHiddenInputProps extends HTMLArkProps<'input'> {}

export const PinInputHiddenInput = (props: PinInputHiddenInputProps) => {
  const pinInput = usePinInputContext()
  const mergedProps = mergeProps(() => pinInput().hiddenInputProps, props)

  return <ark.input {...mergedProps} />
}

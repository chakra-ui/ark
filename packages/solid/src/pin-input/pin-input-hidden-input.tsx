import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputHiddenInputProps = HTMLArkProps<'input'>

export const PinInputHiddenInput = (props: PinInputHiddenInputProps) => {
  const api = usePinInputContext()
  const inputProps = mergeProps(() => api().hiddenInputProps, props)

  return <ark.input {...inputProps} />
}

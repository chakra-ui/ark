import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputLabelProps = HTMLArkProps<'label'>

export const PinInputLabel = (props: PinInputLabelProps) => {
  const pinInput = usePinInputContext()

  return <ark.label {...pinInput().labelProps} {...props} />
}

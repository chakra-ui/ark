import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlProps = HTMLArkProps<'div'>

export const PinInputControl = (props: PinInputControlProps) => {
  const pinInput = usePinInputContext()
  return (
    <ark.div {...pinInput().controlProps} {...props}>
      {props.children}
      <input {...pinInput().hiddenInputProps} />
    </ark.div>
  )
}

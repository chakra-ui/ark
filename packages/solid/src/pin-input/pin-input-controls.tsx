import { ark, type HTMLArkProps } from '../factory'
import { usePinInputContext } from './pin-input-context'

export type PinInputControlsProps = HTMLArkProps<'div'>

export const PinInputControls = (props: PinInputControlsProps) => {
  // TODO add controlsProps when available
  const pinInput = usePinInputContext()
  return (
    <ark.div {...props}>
      {props.children}
      <input {...pinInput().hiddenInputProps} />
    </ark.div>
  )
}

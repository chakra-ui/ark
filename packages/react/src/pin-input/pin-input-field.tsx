import { usePinInputContext } from './pin-input-context'

export type PinInputField = { index: number }

export const PinInputField = (props: PinInputField) => {
  const { index } = props
  const { api } = usePinInputContext()
  return <input {...api.getInputProps({ index })} />
}

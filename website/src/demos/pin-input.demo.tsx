import { PinInput, type PinInputProps } from '~/components/ui/pin-input'

export const Demo = (props: PinInputProps) => {
  return (
    <PinInput placeholder="0" {...props}>
      Pin Input
    </PinInput>
  )
}

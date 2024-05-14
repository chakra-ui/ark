import { NumberInput, type NumberInputProps } from '~/components/ui/number-input'

export const Demo = (props: NumberInputProps) => {
  return (
    <NumberInput defaultValue="3" {...props}>
      Label
    </NumberInput>
  )
}

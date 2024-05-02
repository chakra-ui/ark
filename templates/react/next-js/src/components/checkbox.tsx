import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'

export const Checkbox = (props: ArkCheckbox.RootProps) => (
  <ArkCheckbox.Root checked="indeterminate" {...props}>
    <ArkCheckbox.Label>Checkbox</ArkCheckbox.Label>
    <ArkCheckbox.Control>
      <ArkCheckbox.Indicator>
        <CheckIcon />
      </ArkCheckbox.Indicator>
      <ArkCheckbox.Indicator indeterminate>
        <MinusIcon />
      </ArkCheckbox.Indicator>
    </ArkCheckbox.Control>
    <ArkCheckbox.HiddenInput />
  </ArkCheckbox.Root>
)

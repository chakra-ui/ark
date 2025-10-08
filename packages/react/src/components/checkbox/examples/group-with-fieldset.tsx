import { Checkbox } from '@ark-ui/react/checkbox'
import { Fieldset } from '@ark-ui/react/fieldset'
import { CheckIcon } from 'lucide-react'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const GroupWithFieldset = () => (
  <Fieldset.Root>
    <Fieldset.Legend>Select frameworks</Fieldset.Legend>
    <Checkbox.Group defaultValue={['react']} name="framework">
      {items.map((item) => (
        <Checkbox.Root value={item.value} key={item.value}>
          <Checkbox.Label>{item.label}</Checkbox.Label>
          <Checkbox.Control>
            <Checkbox.Indicator>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      ))}
    </Checkbox.Group>
    <Fieldset.HelperText>Choose your preferred frameworks</Fieldset.HelperText>
    <Fieldset.ErrorText>Error Text</Fieldset.ErrorText>
  </Fieldset.Root>
)

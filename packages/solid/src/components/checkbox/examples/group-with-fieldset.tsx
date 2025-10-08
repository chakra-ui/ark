import { Checkbox } from '@ark-ui/solid/checkbox'
import { Fieldset } from '@ark-ui/solid/fieldset'
import { CheckIcon } from 'lucide-solid'
import { Index } from 'solid-js'

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
      <Index each={items}>
        {(item) => (
          <Checkbox.Root value={item().value}>
            <Checkbox.Label>{item().label}</Checkbox.Label>
            <Checkbox.Control>
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        )}
      </Index>
    </Checkbox.Group>
    <Fieldset.HelperText>Choose your preferred frameworks</Fieldset.HelperText>
    <Fieldset.ErrorText>Error Text</Fieldset.ErrorText>
  </Fieldset.Root>
)

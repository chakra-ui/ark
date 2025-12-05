import { Fieldset } from '@ark-ui/react/fieldset'
import { RadioGroup } from '@ark-ui/react/radio-group'

const frameworks = [
  { id: 'react', label: 'React' },
  { id: 'solid', label: 'Solid' },
  { id: 'vue', label: 'Vue' },
  { id: 'svelte', label: 'Svelte' },
]

export const GroupWithFieldset = () => (
  <Fieldset.Root>
    <Fieldset.Legend>Select a framework</Fieldset.Legend>
    <RadioGroup.Root name="framework">
      {frameworks.map((framework) => (
        <RadioGroup.Item value={framework.id} key={framework.id}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{framework.label}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
    <Fieldset.HelperText>Choose your preferred framework</Fieldset.HelperText>
    <Fieldset.ErrorText>Please select a framework</Fieldset.ErrorText>
  </Fieldset.Root>
)

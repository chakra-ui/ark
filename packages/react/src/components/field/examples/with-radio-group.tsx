import { Field } from '@ark-ui/react/field'
import { RadioGroup } from '@ark-ui/react/radio-group'

export const WithRadioGroup = () => {
  return (
    <Field.Root>
      <Field.Label>Label</Field.Label>
      <RadioGroup.Root>
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value} disabled={item.disabled}>
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </Field.Root>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte', disabled: true },
]

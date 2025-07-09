import { Checkbox, useCheckboxGroup } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

export const GroupProvider = () => {
  const group = useCheckboxGroup({
    defaultValue: ['react'],
    name: 'framework',
  })

  return (
    <Checkbox.GroupProvider value={group}>
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
    </Checkbox.GroupProvider>
  )
}

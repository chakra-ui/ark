import { CheckIcon } from 'lucide-react'
import { Checkbox } from '../..'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

export const GroupWithInvalid = () => (
  <Checkbox.Group invalid>
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
)

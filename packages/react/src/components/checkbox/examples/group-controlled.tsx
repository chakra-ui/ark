import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

export const GroupControlled = () => {
  const [value, setValue] = useState(['react'])
  return (
    <div>
      <Checkbox.Group value={value} name="framework" onValueChange={setValue}>
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
      <pre>Selected: {JSON.stringify(value)}</pre>
    </div>
  )
}

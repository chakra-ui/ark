import { CheckIcon } from 'lucide-react'
import { Checkbox, CheckboxGroup } from '../..'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
]

export const WithGroup = () => (
  <CheckboxGroup defaultValue={['react']} onValueChange={console.log}>
    <div>Choose your favorite framework:</div>
    <div style={{ display: 'flex', gap: '20px', margin: '12px' }}>
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
    </div>
  </CheckboxGroup>
)

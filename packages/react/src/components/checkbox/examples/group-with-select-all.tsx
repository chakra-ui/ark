import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import { useState } from 'react'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

const CheckboxItem = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Label>{props.children}</Checkbox.Label>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  )
}

export const GroupWithSelectAll = () => {
  const [value, setValue] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    setValue(checked ? items.map((item) => item.value) : [])
  }

  const allSelected = value.length === items.length
  const indeterminate = value.length > 0 && value.length < items.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <CheckboxItem
        value="all"
        checked={indeterminate ? 'indeterminate' : allSelected}
        onCheckedChange={(e) => handleSelectAll(!!e.checked)}
      >
        Select All
      </CheckboxItem>

      <Checkbox.Group value={value} name="framework" onValueChange={setValue}>
        {items.map((item) => (
          <CheckboxItem value={item.value} key={item.value}>
            {item.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>

      <pre>Selected: {JSON.stringify(value)}</pre>
    </div>
  )
}

import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/checkbox.module.css'

const CheckboxItem = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root className={styles.Root} {...props}>
      <Checkbox.Control className={styles.Control}>
        <Checkbox.Indicator className={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
        <Checkbox.Indicator className={styles.Indicator} indeterminate>
          <MinusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className={styles.Label}>{props.children}</Checkbox.Label>
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
      <output>Selected: {JSON.stringify(value)}</output>

      <CheckboxItem
        value="all"
        checked={indeterminate ? 'indeterminate' : allSelected}
        onCheckedChange={(e) => handleSelectAll(!!e.checked)}
      >
        JSX Frameworks
      </CheckboxItem>

      <Checkbox.Group
        className={styles.Group}
        style={{ marginInlineStart: '1rem' }}
        value={value}
        name="framework"
        onValueChange={setValue}
      >
        {items.map((item) => (
          <CheckboxItem value={item.value} key={item.value}>
            {item.label}
          </CheckboxItem>
        ))}
      </Checkbox.Group>
    </div>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

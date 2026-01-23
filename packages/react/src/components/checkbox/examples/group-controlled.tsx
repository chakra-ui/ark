import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/checkbox.module.css'

export const GroupControlled = () => {
  const [value, setValue] = useState(['react'])
  return (
    <div className="stack">
      <output>value: {JSON.stringify(value)}</output>
      <Checkbox.Group className={styles.Group} value={value} name="framework" onValueChange={setValue}>
        {items.map((item) => (
          <Checkbox.Root className={styles.Root} value={item.value} key={item.value}>
            <Checkbox.Control className={styles.Control}>
              <Checkbox.Indicator className={styles.Indicator}>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label className={styles.Label}>{item.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
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

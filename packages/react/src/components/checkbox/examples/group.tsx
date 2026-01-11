import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'

export const Group = () => (
  <Checkbox.Group className={styles.Group} defaultValue={['react']} name="framework">
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
)

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

import { Checkbox, useCheckboxGroup } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'

export const GroupProvider = () => {
  const group = useCheckboxGroup({
    defaultValue: ['react'],
    name: 'framework',
  })

  return (
    <Checkbox.GroupProvider className={styles.Group} value={group}>
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
    </Checkbox.GroupProvider>
  )
}

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

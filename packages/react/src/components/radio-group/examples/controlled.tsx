import { RadioGroup } from '@ark-ui/react/radio-group'
import { useState } from 'react'
import styles from 'styles/radio-group.module.css'

export const Controlled = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  const [value, setValue] = useState<string | null>(null)

  return (
    <RadioGroup.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
      <RadioGroup.Label className={styles.Label}>Framework</RadioGroup.Label>
      {frameworks.map((framework) => (
        <RadioGroup.Item className={styles.Item} key={framework} value={framework}>
          <RadioGroup.ItemControl className={styles.ItemControl} />
          <RadioGroup.ItemText className={styles.ItemText}>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

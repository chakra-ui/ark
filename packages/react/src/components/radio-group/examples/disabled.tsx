import { RadioGroup } from '@ark-ui/react/radio-group'
import styles from 'styles/radio-group.module.css'

export const Disabled = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root className={styles.Root} defaultValue="React" disabled>
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

import { RadioGroup } from '@ark-ui/react/radio-group'
import styles from 'styles/radio-group.module.css'

export const Orientation = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root className={styles.Root} orientation="horizontal" defaultValue="React">
      <RadioGroup.Label className={styles.Label}>Framework</RadioGroup.Label>
      <div className="hstack">
        {frameworks.map((framework) => (
          <RadioGroup.Item className={styles.Item} key={framework} value={framework}>
            <RadioGroup.ItemControl className={styles.ItemControl} />
            <RadioGroup.ItemText className={styles.ItemText}>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </div>
    </RadioGroup.Root>
  )
}

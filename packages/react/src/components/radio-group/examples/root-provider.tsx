import { RadioGroup, useRadioGroup } from '@ark-ui/react/radio-group'
import button from 'styles/button.module.css'
import styles from 'styles/radio-group.module.css'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Vue']
  const radioGroup = useRadioGroup({ defaultValue: 'React' })

  return (
    <div className="stack">
      <RadioGroup.RootProvider className={styles.Root} value={radioGroup}>
        <RadioGroup.Label className={styles.Label}>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Item className={styles.Item} key={framework} value={framework}>
            <RadioGroup.ItemControl className={styles.ItemControl} />
            <RadioGroup.ItemText className={styles.ItemText}>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.RootProvider>

      <button className={button.Root} onClick={() => radioGroup.setValue('Solid')}>
        Set to Solid
      </button>
    </div>
  )
}

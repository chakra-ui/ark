import { Fieldset } from '@ark-ui/react/fieldset'
import { RadioGroup } from '@ark-ui/react/radio-group'
import fieldset from 'styles/fieldset.module.css'
import styles from 'styles/radio-group.module.css'

export const WithFieldset = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <Fieldset.Root className={fieldset.Root}>
      <Fieldset.Legend className={fieldset.Legend}>Select a framework</Fieldset.Legend>
      <RadioGroup.Root className={styles.Root}>
        {frameworks.map((framework) => (
          <RadioGroup.Item className={styles.Item} key={framework} value={framework}>
            <RadioGroup.ItemControl className={styles.ItemControl} />
            <RadioGroup.ItemText className={styles.ItemText}>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      <Fieldset.HelperText className={fieldset.HelperText}>Choose your preferred framework</Fieldset.HelperText>
      <Fieldset.ErrorText className={fieldset.ErrorText}>Please select a framework</Fieldset.ErrorText>
    </Fieldset.Root>
  )
}

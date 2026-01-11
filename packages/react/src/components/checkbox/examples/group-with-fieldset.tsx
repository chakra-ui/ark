import { Checkbox } from '@ark-ui/react/checkbox'
import { Fieldset } from '@ark-ui/react/fieldset'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'
import fieldset from 'styles/fieldset.module.css'

export const GroupWithFieldset = () => (
  <Fieldset.Root className={fieldset.Root}>
    <Fieldset.Legend className={fieldset.Legend}>Select frameworks</Fieldset.Legend>
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
    <Fieldset.HelperText className={fieldset.HelperText}>Choose your preferred frameworks</Fieldset.HelperText>
  </Fieldset.Root>
)

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

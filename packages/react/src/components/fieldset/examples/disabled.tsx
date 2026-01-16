import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export const Disabled = () => (
  <Fieldset.Root className={styles.Root} disabled>
    <Fieldset.Legend className={styles.Legend}>Shipping Address</Fieldset.Legend>
    <Fieldset.HelperText className={styles.HelperText}>
      Your address cannot be changed after order confirmation.
    </Fieldset.HelperText>

    <Field.Root className={field.Root}>
      <Field.Label className={field.Label}>Street</Field.Label>
      <Field.Input className={field.Input} defaultValue="123 Main St" />
    </Field.Root>

    <Field.Root className={field.Root}>
      <Field.Label className={field.Label}>City</Field.Label>
      <Field.Input className={field.Input} defaultValue="San Francisco" />
    </Field.Root>
  </Fieldset.Root>
)

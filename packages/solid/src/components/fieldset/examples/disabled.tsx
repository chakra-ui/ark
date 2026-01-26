import { Field } from '@ark-ui/solid/field'
import { Fieldset } from '@ark-ui/solid/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export const Disabled = () => (
  <Fieldset.Root class={styles.Root} disabled>
    <Fieldset.Legend class={styles.Legend}>Shipping Address</Fieldset.Legend>
    <Fieldset.HelperText class={styles.HelperText}>
      Your address cannot be changed after order confirmation.
    </Fieldset.HelperText>

    <Field.Root class={field.Root}>
      <Field.Label class={field.Label}>Street</Field.Label>
      <Field.Input class={field.Input} value="123 Main St" />
    </Field.Root>

    <Field.Root class={field.Root}>
      <Field.Label class={field.Label}>City</Field.Label>
      <Field.Input class={field.Input} value="San Francisco" />
    </Field.Root>
  </Fieldset.Root>
)

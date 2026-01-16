import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export const Invalid = () => (
  <Fieldset.Root className={styles.Root} invalid>
    <Fieldset.Legend className={styles.Legend}>Account Information</Fieldset.Legend>
    <Fieldset.ErrorText className={styles.ErrorText}>Please fix the errors below to continue.</Fieldset.ErrorText>

    <Field.Root className={field.Root} invalid>
      <Field.Label className={field.Label}>Username</Field.Label>
      <Field.Input className={field.Input} defaultValue="jo" />
      <Field.ErrorText className={field.ErrorText}>Username must be at least 3 characters</Field.ErrorText>
    </Field.Root>

    <Field.Root className={field.Root} invalid>
      <Field.Label className={field.Label}>Email</Field.Label>
      <Field.Input className={field.Input} type="email" defaultValue="invalid-email" />
      <Field.ErrorText className={field.ErrorText}>Please enter a valid email address</Field.ErrorText>
    </Field.Root>
  </Fieldset.Root>
)

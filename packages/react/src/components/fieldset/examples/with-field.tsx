import { Field } from '@ark-ui/react/field'
import { Fieldset } from '@ark-ui/react/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export const WithField = () => {
  return (
    <Fieldset.Root className={styles.Root}>
      <Fieldset.Legend className={styles.Legend}>Personal Information</Fieldset.Legend>

      <Field.Root className={field.Root}>
        <Field.Label className={field.Label}>First Name</Field.Label>
        <Field.Input className={field.Input} placeholder="Enter your first name" />
        <Field.HelperText className={field.HelperText}>As it appears on your ID</Field.HelperText>
      </Field.Root>

      <Field.Root className={field.Root}>
        <Field.Label className={field.Label}>Last Name</Field.Label>
        <Field.Input className={field.Input} placeholder="Enter your last name" />
      </Field.Root>
    </Fieldset.Root>
  )
}

import { Editable } from '@ark-ui/react/editable'
import { Field } from '@ark-ui/react/field'
import field from 'styles/field.module.css'
import styles from 'styles/editable.module.css'

export const WithField = () => (
  <Field.Root className={field.Root}>
    <Editable.Root className={styles.Root} placeholder="Enter your bio">
      <Editable.Label className={field.Label}>Bio</Editable.Label>
      <Editable.Area className={styles.Area}>
        <Editable.Input className={styles.Input} />
        <Editable.Preview className={styles.Preview} />
      </Editable.Area>
    </Editable.Root>
    <Field.HelperText className={field.HelperText}>Click to edit your bio</Field.HelperText>
    <Field.ErrorText className={field.ErrorText}>Bio is required</Field.ErrorText>
  </Field.Root>
)

import { Field } from '@ark-ui/react/field'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

export const Validation = () => (
  <form className="stack" noValidate onSubmit={(event) => event.preventDefault()}>
    <Field.Root className={styles.Root} required validationMode="onBlur">
      <Field.Label className={styles.Label}>
        Email
        <Field.Indicator type="required">*</Field.Indicator>
      </Field.Label>
      <Field.Input className={styles.Input} type="email" placeholder="me@example.com" />
      <Field.HelperText className={styles.HelperText}>We'll never share your email.</Field.HelperText>
      <Field.ErrorText className={styles.ErrorText} match="valueMissing">
        Email is required
      </Field.ErrorText>
      <Field.ErrorText className={styles.ErrorText} match="typeMismatch">
        Enter a valid email address
      </Field.ErrorText>
    </Field.Root>
    <button className={button.Root} type="submit">
      Submit
    </button>
  </form>
)

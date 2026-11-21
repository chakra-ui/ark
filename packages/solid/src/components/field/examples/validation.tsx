import { Field } from '@ark-ui/solid/field'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

export const Validation = () => (
  <form class="stack" novalidate onSubmit={(event) => event.preventDefault()}>
    <Field.Root class={styles.Root} required validationMode="onBlur">
      <Field.Label class={styles.Label}>
        Email
        <Field.Indicator type="required">*</Field.Indicator>
      </Field.Label>
      <Field.Input class={styles.Input} type="email" placeholder="me@example.com" />
      <Field.HelperText class={styles.HelperText}>We'll never share your email.</Field.HelperText>
      <Field.ErrorText class={styles.ErrorText} match="valueMissing">
        Email is required
      </Field.ErrorText>
      <Field.ErrorText class={styles.ErrorText} match="typeMismatch">
        Enter a valid email address
      </Field.ErrorText>
    </Field.Root>
    <button class={button.Root} type="submit">
      Submit
    </button>
  </form>
)

import { Field } from '@ark-ui/react/field'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

const reserved = ['admin', 'root', 'support']

export const CustomValidation = () => (
  <form className="stack" noValidate onSubmit={(event) => event.preventDefault()}>
    <Field.Root
      className={styles.Root}
      required
      validationMode="onChange"
      validate={({ value }) => {
        if (value.length > 0 && value.length < 3) return 'Use at least 3 characters'
        if (reserved.includes(value.toLowerCase())) return 'This username is reserved'
      }}
    >
      <Field.Label className={styles.Label}>Username</Field.Label>
      <Field.Input className={styles.Input} />
      <Field.Context>
        {(field) => <Field.ErrorText className={styles.ErrorText}>{field.errors[0]}</Field.ErrorText>}
      </Field.Context>
    </Field.Root>
    <button className={button.Root} type="submit">
      Submit
    </button>
  </form>
)

import { Field } from '@ark-ui/react/field'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

export const ServerErrors = () => {
  const [errors, setErrors] = useState<string[]>([])

  return (
    <form
      className="stack"
      onSubmit={(event) => {
        event.preventDefault()
        setErrors(['This email is already registered'])
      }}
    >
      <Field.Root className={styles.Root} errors={errors}>
        <Field.Label className={styles.Label}>Email</Field.Label>
        <Field.Input className={styles.Input} type="email" name="email" defaultValue="taken@example.com" />
        <Field.HelperText className={styles.HelperText}>Submit to check the email with the server.</Field.HelperText>
        <Field.Context>
          {(field) => <Field.ErrorText className={styles.ErrorText}>{field.errors[0]}</Field.ErrorText>}
        </Field.Context>
      </Field.Root>
      <button className={button.Root} type="submit">
        Submit
      </button>
    </form>
  )
}

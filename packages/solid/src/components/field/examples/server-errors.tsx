import { Field } from '@ark-ui/solid/field'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

export const ServerErrors = () => {
  const [errors, setErrors] = createSignal<string[]>([])

  return (
    <form
      class="stack"
      onSubmit={(event) => {
        event.preventDefault()
        setErrors(['This email is already registered'])
      }}
    >
      <Field.Root class={styles.Root} errors={errors()}>
        <Field.Label class={styles.Label}>Email</Field.Label>
        <Field.Input class={styles.Input} type="email" name="email" value="taken@example.com" />
        <Field.HelperText class={styles.HelperText}>Submit to check the email with the server.</Field.HelperText>
        <Field.Context>
          {(field) => <Field.ErrorText class={styles.ErrorText}>{field().errors[0]}</Field.ErrorText>}
        </Field.Context>
      </Field.Root>
      <button class={button.Root} type="submit">
        Submit
      </button>
    </form>
  )
}

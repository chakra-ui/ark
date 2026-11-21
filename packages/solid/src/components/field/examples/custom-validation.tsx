import { Field } from '@ark-ui/solid/field'
import button from 'styles/button.module.css'
import styles from 'styles/field.module.css'

const reserved = ['admin', 'root', 'support']

export const CustomValidation = () => (
  <form class="stack" novalidate onSubmit={(event) => event.preventDefault()}>
    <Field.Root
      class={styles.Root}
      required
      validationMode="onChange"
      validate={({ value }) => {
        if (value.length > 0 && value.length < 3) return 'Use at least 3 characters'
        if (reserved.includes(value.toLowerCase())) return 'This username is reserved'
      }}
    >
      <Field.Label class={styles.Label}>Username</Field.Label>
      <Field.Input class={styles.Input} />
      <Field.Context>
        {(field) => <Field.ErrorText class={styles.ErrorText}>{field().errors[0]}</Field.ErrorText>}
      </Field.Context>
    </Field.Root>
    <button class={button.Root} type="submit">
      Submit
    </button>
  </form>
)

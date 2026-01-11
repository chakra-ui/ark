import { Field, useField } from '@ark-ui/solid/field'
import { createMemo, createSignal } from 'solid-js'
import styles from 'styles/field.module.css'
import button from 'styles/button.module.css'

export const RootProvider = () => {
  const [invalid, setInvalid] = createSignal(false)
  const fieldProps = createMemo(() => ({
    invalid: invalid(),
  }))
  const value = useField(fieldProps)

  return (
    <>
      <button class={button.Root} style={{ 'margin-bottom': '1rem' }} onClick={() => setInvalid((prev) => !prev)}>
        Toggle Invalid
      </button>
      <Field.RootProvider class={styles.Root} value={value}>
        <Field.Label class={styles.Label}>Label</Field.Label>
        <Field.Input class={styles.Input} />
        <Field.HelperText class={styles.HelperText}>Some additional Info</Field.HelperText>
        <Field.ErrorText class={styles.ErrorText}>Error Info</Field.ErrorText>
      </Field.RootProvider>
    </>
  )
}

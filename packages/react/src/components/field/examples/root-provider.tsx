import { Field, useField } from '@ark-ui/react/field'
import { useState } from 'react'
import styles from 'styles/field.module.css'
import button from 'styles/button.module.css'

export const RootProvider = () => {
  const [invalid, setInvalid] = useState(false)
  const field = useField({ invalid })

  return (
    <>
      <button className={button.Root} style={{ marginBottom: '1rem' }} onClick={() => setInvalid((prev) => !prev)}>
        Toggle Invalid
      </button>
      <Field.RootProvider className={styles.Root} value={field}>
        <Field.Label className={styles.Label}>Label</Field.Label>
        <Field.Input className={styles.Input} />
        <Field.HelperText className={styles.HelperText}>Some additional Info</Field.HelperText>
        <Field.ErrorText className={styles.ErrorText}>Error Info</Field.ErrorText>
      </Field.RootProvider>
    </>
  )
}

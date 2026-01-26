import { Field } from '@ark-ui/react/field'
import { Fieldset, useFieldset } from '@ark-ui/react/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export const RootProvider = () => {
  const fieldset = useFieldset()

  return (
    <Fieldset.RootProvider className={styles.Root} value={fieldset}>
      <Fieldset.Legend className={styles.Legend}>Contact Details</Fieldset.Legend>

      <Field.Root className={field.Root}>
        <Field.Label className={field.Label}>Name</Field.Label>
        <Field.Input className={field.Input} placeholder="John Doe" />
      </Field.Root>

      <Field.Root className={field.Root}>
        <Field.Label className={field.Label}>Email</Field.Label>
        <Field.Input className={field.Input} type="email" placeholder="john@example.com" />
      </Field.Root>
    </Fieldset.RootProvider>
  )
}

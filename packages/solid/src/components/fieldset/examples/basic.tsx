import { Field } from '@ark-ui/solid/field'
import { Fieldset } from '@ark-ui/solid/fieldset'
import field from 'styles/field.module.css'
import styles from 'styles/fieldset.module.css'

export const Basic = () => {
  return (
    <Fieldset.Root class={styles.Root}>
      <Fieldset.Legend class={styles.Legend}>Contact Details</Fieldset.Legend>

      <Field.Root class={field.Root}>
        <Field.Label class={field.Label}>Name</Field.Label>
        <Field.Input class={field.Input} placeholder="John Doe" />
      </Field.Root>

      <Field.Root class={field.Root}>
        <Field.Label class={field.Label}>Email</Field.Label>
        <Field.Input class={field.Input} type="email" placeholder="john@example.com" />
      </Field.Root>
    </Fieldset.Root>
  )
}

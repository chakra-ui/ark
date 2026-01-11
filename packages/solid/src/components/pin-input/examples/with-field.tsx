import { Field } from '@ark-ui/solid/field'
import { PinInput } from '@ark-ui/solid/pin-input'
import { Index } from 'solid-js'
import fieldStyles from 'styles/field.module.css'
import styles from 'styles/pin-input.module.css'

export const WithField = () => (
  <Field.Root class={fieldStyles.Root}>
    <PinInput.Root class={styles.Root}>
      <PinInput.Label class={styles.Label}>Label</PinInput.Label>
      <PinInput.Control class={styles.Control}>
        <Index each={[0, 1, 2]}>{(id) => <PinInput.Input index={id()} class={styles.Input} />}</Index>
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText class={fieldStyles.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText class={fieldStyles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

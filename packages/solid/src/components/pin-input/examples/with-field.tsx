import { Field } from '@ark-ui/solid/field'
import { PinInput } from '@ark-ui/solid/pin-input'
import { For } from 'solid-js'
import fieldStyles from 'styles/field.module.css'
import styles from 'styles/pin-input.module.css'

export const WithField = () => (
  <Field.Root class={fieldStyles.Root}>
    <PinInput.Root class={styles.Root} count={3}>
      <PinInput.Label class={styles.Label}>Label</PinInput.Label>
      <PinInput.Control class={styles.Control}>
        <For each={[0, 1, 2]} keyed={false}>
          {(id) => <PinInput.Input index={id()} class={styles.Input} />}
        </For>
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
    <Field.HelperText class={fieldStyles.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText class={fieldStyles.ErrorText}>Error Info</Field.ErrorText>
  </Field.Root>
)

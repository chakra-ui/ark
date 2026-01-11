<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { PinInput } from '@ark-ui/svelte/pin-input'
  import fieldStyles from 'styles/field.module.css'
  import styles from 'styles/pin-input.module.css'
</script>

<Field.Root class={fieldStyles.Root}>
  <PinInput.Root class={styles.Root}>
    <PinInput.Label class={styles.Label}>Label</PinInput.Label>
    <PinInput.Control class={styles.Control}>
      {#each [0, 1, 2] as id, index (id)}
        <PinInput.Input {index} class={styles.Input} />
      {/each}
    </PinInput.Control>
    <PinInput.HiddenInput />
  </PinInput.Root>
  <Field.HelperText class={fieldStyles.HelperText}>Additional Info</Field.HelperText>
  <Field.ErrorText class={fieldStyles.ErrorText}>Error Info</Field.ErrorText>
</Field.Root>

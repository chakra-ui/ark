<script lang="ts">
  import { Field, useField } from '@ark-ui/svelte/field'
  import styles from 'styles/field.module.css'
  import button from 'styles/button.module.css'

  const id = $props.id()

  let invalid = $state(false)
  const field = useField({ id, get invalid() { return invalid } })
</script>

<button class={button.Root} style="margin-bottom: 1rem" onclick={() => invalid = !invalid}>
  Toggle Invalid
</button>
<Field.RootProvider class={styles.Root} value={field}>
  <Field.Label class={styles.Label}>Label</Field.Label>
  <Field.Input class={styles.Input} />
  <Field.HelperText class={styles.HelperText}>Some additional Info</Field.HelperText>
  <Field.ErrorText class={styles.ErrorText}>Error Info</Field.ErrorText>
</Field.RootProvider>

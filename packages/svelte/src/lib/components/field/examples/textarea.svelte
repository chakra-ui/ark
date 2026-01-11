<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import styles from 'styles/field.module.css'
</script>

<Field.Root class={styles.Root}>
  <Field.Label class={styles.Label}>Label</Field.Label>
  <Field.Textarea class={styles.Textarea} />
  <Field.HelperText class={styles.HelperText}>Some additional Info</Field.HelperText>
  <Field.ErrorText class={styles.ErrorText}>Error Info</Field.ErrorText>
</Field.Root>

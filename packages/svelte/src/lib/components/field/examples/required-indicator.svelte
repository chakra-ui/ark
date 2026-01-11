<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import styles from 'styles/field.module.css'
</script>

<Field.Root class={styles.Root} required>
  <Field.Label class={styles.Label}>
    Username
    <Field.RequiredIndicator />
  </Field.Label>
  <Field.Input class={styles.Input} />
</Field.Root>

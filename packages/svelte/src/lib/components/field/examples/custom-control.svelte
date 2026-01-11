<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import styles from 'styles/field.module.css'
</script>

<Field.Root class={styles.Root} invalid>
  <Field.Label class={styles.Label}>Any Control</Field.Label>
  <Field.Context>
    {#snippet render(field)}
      <input {...field().getInputProps()} />
    {/snippet}
  </Field.Context>
  <Field.HelperText class={styles.HelperText}>Uses getInputProps() for maximum flexibility</Field.HelperText>
  <Field.ErrorText class={styles.ErrorText}>This field has an error</Field.ErrorText>
</Field.Root>

<script lang="ts">
  import { Editable } from '@ark-ui/svelte/editable'
  import { Field } from '@ark-ui/svelte/field'
  import field from 'styles/field.module.css'
  import styles from 'styles/editable.module.css'
</script>

<Field.Root class={field.Root}>
  <Editable.Root class={styles.Root} placeholder="Enter your bio">
    <Editable.Label class={field.Label}>Bio</Editable.Label>
    <Editable.Area class={styles.Area}>
      <Editable.Input class={styles.Input} />
      <Editable.Preview class={styles.Preview} />
    </Editable.Area>
  </Editable.Root>
  <Field.HelperText class={field.HelperText}>Double-click to edit your bio</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Bio is required</Field.ErrorText>
</Field.Root>

<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import field from 'styles/field.module.css'
  import styles from 'styles/fieldset.module.css'
</script>

<Fieldset.Root class={styles.Root} invalid>
  <Fieldset.Legend class={styles.Legend}>Account Information</Fieldset.Legend>
  <Fieldset.ErrorText class={styles.ErrorText}>Please fix the errors below to continue.</Fieldset.ErrorText>

  <Field.Root class={field.Root} invalid>
    <Field.Label class={field.Label}>Username</Field.Label>
    <Field.Input class={field.Input} value="jo" />
    <Field.ErrorText class={field.ErrorText}>Username must be at least 3 characters</Field.ErrorText>
  </Field.Root>

  <Field.Root class={field.Root} invalid>
    <Field.Label class={field.Label}>Email</Field.Label>
    <Field.Input class={field.Input} type="email" value="invalid-email" />
    <Field.ErrorText class={field.ErrorText}>Please enter a valid email address</Field.ErrorText>
  </Field.Root>
</Fieldset.Root>

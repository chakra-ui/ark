<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import { Fieldset } from '@ark-ui/svelte/fieldset'
  import field from 'styles/field.module.css'
  import styles from 'styles/fieldset.module.css'
</script>

<Fieldset.Root class={styles.Root}>
  <Fieldset.Legend class={styles.Legend}>Personal Information</Fieldset.Legend>

  <Field.Root class={field.Root}>
    <Field.Label class={field.Label}>First Name</Field.Label>
    <Field.Input class={field.Input} placeholder="Enter your first name" />
    <Field.HelperText class={field.HelperText}>As it appears on your ID</Field.HelperText>
  </Field.Root>

  <Field.Root class={field.Root}>
    <Field.Label class={field.Label}>Last Name</Field.Label>
    <Field.Input class={field.Input} placeholder="Enter your last name" />
  </Field.Root>
</Fieldset.Root>

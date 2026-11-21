<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import button from 'styles/button.module.css'
  import styles from 'styles/field.module.css'

  const reserved = ['admin', 'root', 'support']

  const validate = ({ value }: { value: string }) => {
    if (value.length > 0 && value.length < 3) return 'Use at least 3 characters'
    if (reserved.includes(value.toLowerCase())) return 'This username is reserved'
  }
</script>

<form class="stack" novalidate onsubmit={(event) => event.preventDefault()}>
  <Field.Root class={styles.Root} required validationMode="onChange" {validate}>
    <Field.Label class={styles.Label}>Username</Field.Label>
    <Field.Input class={styles.Input} />
    <Field.Context>
      {#snippet render(field)}
        <Field.ErrorText class={styles.ErrorText}>{field?.()?.errors[0]}</Field.ErrorText>
      {/snippet}
    </Field.Context>
  </Field.Root>
  <button class={button.Root} type="submit">Submit</button>
</form>

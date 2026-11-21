<script lang="ts">
  import { Field } from '@ark-ui/svelte/field'
  import button from 'styles/button.module.css'
  import styles from 'styles/field.module.css'

  let errors = $state<string[]>([])
</script>

<form
  class="stack"
  onsubmit={(event) => {
    event.preventDefault()
    errors = ['This email is already registered']
  }}
>
  <Field.Root class={styles.Root} {errors}>
    <Field.Label class={styles.Label}>Email</Field.Label>
    <Field.Input class={styles.Input} type="email" name="email" value="taken@example.com" />
    <Field.HelperText class={styles.HelperText}>Submit to check the email with the server.</Field.HelperText>
    <Field.Context>
      {#snippet render(field)}
        <Field.ErrorText class={styles.ErrorText}>{field?.()?.errors[0]}</Field.ErrorText>
      {/snippet}
    </Field.Context>
  </Field.Root>
  <button class={button.Root} type="submit">Submit</button>
</form>

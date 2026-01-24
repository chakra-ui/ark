<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { Field } from '@ark-ui/svelte/field'
  import { CheckIcon, MinusIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
  import field from 'styles/field.module.css'
</script>

<Field.Root class={field.Root} data-inline>
  <Checkbox.Root class={styles.Root}>
    <Checkbox.Control class={styles.Control}>
      <Checkbox.Indicator class={styles.Indicator}>
        <CheckIcon />
      </Checkbox.Indicator>
      <Checkbox.Indicator class={styles.Indicator} indeterminate>
        <MinusIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class={styles.Label}>Label</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
  <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
  <Field.ErrorText class={field.ErrorText}>Error Info</Field.ErrorText>
</Field.Root>

<script lang="ts">
  import { Checkbox, useCheckbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'

  const checkbox = useCheckbox()
</script>

<Checkbox.RootProvider class={styles.Root} value={checkbox}>
  <Checkbox.Control class={styles.Control}>
    <Checkbox.Indicator class={styles.Indicator}>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.RootProvider>

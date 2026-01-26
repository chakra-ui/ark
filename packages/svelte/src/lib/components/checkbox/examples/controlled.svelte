<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'

  let checked = $state(false)
</script>

<Checkbox.Root class={styles.Root} bind:checked>
  <Checkbox.Control class={styles.Control}>
    <Checkbox.Indicator class={styles.Indicator}>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Label class={styles.Label}>Checkbox</Checkbox.Label>
  <Checkbox.HiddenInput />
</Checkbox.Root>

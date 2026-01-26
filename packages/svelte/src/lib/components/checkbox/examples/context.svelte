<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
  import styles from 'styles/checkbox.module.css'
</script>

<Checkbox.Root class={styles.Root}>
  <Checkbox.Control class={styles.Control}>
    <Checkbox.Indicator class={styles.Indicator}>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Control>
  <Checkbox.Context>
    {#snippet render(api)}
      <Checkbox.Label class={styles.Label}>Checked: {String(api().checked)}</Checkbox.Label>
    {/snippet}
  </Checkbox.Context>
  <Checkbox.HiddenInput />
</Checkbox.Root>

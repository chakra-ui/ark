<script lang="ts">
  import { Switch } from '@ark-ui/svelte/switch'
  import styles from 'styles/switch.module.css'
</script>

<Switch.Root class={styles.Root}>
  <Switch.Control class={styles.Control}>
    <Switch.Thumb class={styles.Thumb} />
  </Switch.Control>
  <Switch.Context>
    {#snippet render(context)}
      <Switch.Label class={styles.Label}>Feature is {context().checked ? 'enabled' : 'disabled'}</Switch.Label>
    {/snippet}
  </Switch.Context>
  <Switch.HiddenInput />
</Switch.Root>

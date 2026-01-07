<script lang="ts">
  import { Switch } from '@ark-ui/svelte/switch'
  import styles from 'styles/switch.module.css'

  let checked = $state(false)
</script>

<Switch.Root class={styles.Root} bind:checked>
  <Switch.Control class={styles.Control}>
    <Switch.Thumb class={styles.Thumb} />
  </Switch.Control>
  <Switch.Label class={styles.Label}>Label</Switch.Label>
  <Switch.HiddenInput />
</Switch.Root>

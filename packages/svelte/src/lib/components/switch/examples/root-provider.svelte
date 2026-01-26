<script lang="ts">
  import { Switch, useSwitch } from '@ark-ui/svelte/switch'
  import button from 'styles/button.module.css'
  import styles from 'styles/switch.module.css'

  const id = $props.id()
  const _switch = useSwitch({ id })
</script>

<div class="stack">
  <button class={button.Root} onclick={() => _switch().toggleChecked()}>Toggle</button>

  <Switch.RootProvider class={styles.Root} value={_switch}>
    <Switch.Control class={styles.Control}>
      <Switch.Thumb class={styles.Thumb} />
    </Switch.Control>
    <Switch.Label class={styles.Label}>Label</Switch.Label>
    <Switch.HiddenInput />
  </Switch.RootProvider>
</div>

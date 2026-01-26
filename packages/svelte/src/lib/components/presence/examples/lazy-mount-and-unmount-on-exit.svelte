<script lang="ts">
  import { Presence, type PresenceProps } from '@ark-ui/svelte/presence'
  import button from 'styles/button.module.css'
  import styles from 'styles/presence.module.css'

  const props: PresenceProps = $props()
  let present = $state(false)

  function toggle() {
    present = !present
  }
</script>

<div class="stack">
  <button class={button.Root} onclick={toggle}>Toggle</button>
  <Presence {...props} class={styles.Box} lazyMount unmountOnExit {present}>Lazy + Unmount</Presence>
</div>

<script lang="ts">
  import { useHotkeyRecorder } from '$lib/providers/hotkeys/index.ts'
  import button from 'styles/button.module.css'
  import styles from 'styles/hotkeys.module.css'

  let binding = $state<string | null>(null)
  let lastEvent = $state<string | null>(null)

  const recorder = useHotkeyRecorder({
    onRecord: (hotkey) => {
      binding = hotkey.display
      lastEvent = 'recorded'
    },
    onCancel: () => (lastEvent = 'cancelled'),
    onClear: () => {
      binding = null
      lastEvent = 'cleared'
    },
  })
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>
    Click record, then press a shortcut. <kbd class={styles.Kbd}>Esc</kbd>
    cancels,
    <kbd class={styles.Kbd}>Backspace</kbd>
    clears.
  </p>

  <div class={styles.Toolbar}>
    <button type="button" class={button.Root} disabled={recorder.state().recording} onclick={() => recorder.start()}>
      {recorder.state().recording ? 'Listening…' : 'Record shortcut'}
    </button>
    {#if recorder.state().recording}
      <span class={styles.Badge} data-state="active">
        <span class={styles.Dot} data-pulse=""></span>
        {recorder.state().value?.display ?? 'Press a key'}
      </span>
    {/if}
  </div>

  <div class={styles.Section}>
    <span class={styles.SectionLabel}>Bound to</span>
    <div class={styles.KeyStrip}>
      {#if binding}
        <kbd class={styles.Kbd} data-active="">{binding}</kbd>
      {:else}
        <span class={styles.Placeholder}>nothing yet</span>
      {/if}
    </div>
  </div>

  <div class={styles.Section}>
    <span class={styles.SectionLabel}>Last event</span>
    <span class={styles.Badge}>{lastEvent ?? 'none'}</span>
  </div>
</div>

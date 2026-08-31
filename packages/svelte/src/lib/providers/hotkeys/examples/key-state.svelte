<script lang="ts">
  import { useHotkey, useIsKeyPressed, usePressedKeys } from '$lib/providers/hotkeys/index.ts'
  import styles from 'styles/hotkeys.module.css'

  useHotkey({ hotkey: 'mod+K', action: () => {} })

  const pressedKeys = usePressedKeys()
  const isShiftPressed = useIsKeyPressed({ hotkey: 'shift' })
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>Hold any key to see it tracked live</p>

  <div class={styles.Section}>
    <span class={styles.SectionLabel}>Currently pressed</span>
    <div class={styles.KeyStrip}>
      {#if pressedKeys().length === 0}
        <span class={styles.Placeholder}>nothing</span>
      {:else}
        {#each pressedKeys() as key (key)}
          <kbd class={styles.Kbd} data-active="">{key}</kbd>
        {/each}
      {/if}
    </div>
  </div>

  <div class={styles.Section}>
    <span class={styles.SectionLabel}>Shift</span>
    <span class={styles.Badge} data-state={isShiftPressed() ? 'active' : undefined}>
      <span class={styles.Dot} data-pulse={isShiftPressed() ? '' : undefined}></span>
      {isShiftPressed() ? 'Precision mode' : 'Hold Shift for precision'}
    </span>
  </div>
</div>

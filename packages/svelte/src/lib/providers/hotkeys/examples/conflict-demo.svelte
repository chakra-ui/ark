<script lang="ts">
  import { useHotkeyRegistrations, useHotkeys } from '$lib/providers/hotkeys/index.ts'
  import styles from 'styles/hotkeys.module.css'

  let fired = $state<string[]>([])

  useHotkeys([
    { id: 'first', hotkey: 'mod+K', action: () => (fired = [...fired, 'First']), label: 'First' },
    { id: 'second', hotkey: 'mod+K', action: () => (fired = [...fired, 'Second']), label: 'Second' },
  ])

  const commands = useHotkeyRegistrations()
</script>

<div class={styles.Section}>
  <span class={styles.SectionLabel}>Registered on mod+K</span>
  <div class={styles.KeyStrip}>
    {#if commands().length === 0}
      <span class={styles.Placeholder}>none</span>
    {:else}
      {#each commands() as command (command.id)}
        <span class={styles.Badge}>{command.label}</span>
      {/each}
    {/if}
  </div>
</div>

<div class={styles.Section}>
  <span class={styles.SectionLabel}>Fired on last press</span>
  <span class={styles.Badge} data-state={fired.length > 0 ? 'active' : undefined}>
    {fired.slice(-2).join(' + ') || 'nothing yet'}
  </span>
</div>

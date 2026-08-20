<script lang="ts">
  import { useFormatHotkey, useHotkeys, usePlatform } from '$lib/providers/hotkeys/index.ts'
  import styles from 'styles/hotkeys.module.css'

  const commands = [
    { id: '02-save', hotkey: 'mod+S', label: 'Save', category: 'File' },
    { id: '02-undo', hotkey: 'mod+Z', label: 'Undo', category: 'Edit' },
    { id: '02-redo', hotkey: 'mod+shift+Z', label: 'Redo', category: 'Edit' },
  ]

  let lastFired = $state<string | null>(null)
  const platform = usePlatform()
  const formatHotkey = useFormatHotkey()

  useHotkeys(commands.map((command) => ({ ...command, action: () => (lastFired = command.id) })))
</script>

<div class={styles.Panel}>
  <div class={styles.Toolbar}>
    <span class={styles.SectionLabel}>Detected platform</span>
    <span class={styles.Badge}>{platform()}</span>
  </div>
  <ul class={styles.List}>
    {#each commands as command (command.id)}
      <li class={styles.Row} data-fired={command.id === lastFired ? '' : undefined}>
        <span>{command.label}</span>
        <kbd class={styles.Kbd} data-active={command.id === lastFired ? '' : undefined}>
          {formatHotkey(command.hotkey)}
        </kbd>
      </li>
    {/each}
  </ul>
</div>

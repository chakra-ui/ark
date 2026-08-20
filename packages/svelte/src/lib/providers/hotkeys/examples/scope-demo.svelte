<script lang="ts">
  import { useFormatHotkey, useHotkeyStore, useHotkeys } from '$lib/providers/hotkeys/index.ts'
  import button from 'styles/button.module.css'
  import styles from 'styles/hotkeys.module.css'

  const commands = [
    { id: 'bold', hotkey: 'mod+B', label: 'Bold', scope: 'editor' },
    { id: 'print', hotkey: 'mod+P', label: 'Print', scope: 'reader' },
  ]

  const store = useHotkeyStore()
  const formatHotkey = useFormatHotkey()
  let scope = $state('editor')
  let fired = $state<string | null>(null)

  useHotkeys(
    commands.map((command) => ({
      id: command.id,
      hotkey: command.hotkey,
      scopes: [command.scope],
      action: () => (fired = command.id),
    })),
  )

  const toggle = () => {
    scope = scope === 'editor' ? 'reader' : 'editor'
    fired = null
    store.setScope(scope)
  }
</script>

<div class={styles.Panel}>
  <p class={styles.Hint}>Only commands in the active scope respond</p>

  <div class={styles.Toolbar}>
    <button type="button" class={button.Root} onclick={toggle}>Switch scope</button>
    <span class={styles.Badge} data-state="active">{scope}</span>
  </div>

  <ul class={styles.List}>
    {#each commands as command (command.id)}
      <li class={styles.Row} data-fired={command.id === fired ? '' : undefined}>
        <span style="opacity: {command.scope === scope ? 1 : 0.45}">
          {command.label}
          <span class={styles.MetricLabel}>· {command.scope}</span>
        </span>
        <kbd class={styles.Kbd} data-active={command.id === fired ? '' : undefined}>
          {formatHotkey(command.hotkey)}
        </kbd>
      </li>
    {/each}
  </ul>
</div>

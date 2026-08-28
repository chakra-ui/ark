<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tooltip } from '@ark-ui/svelte/tooltip'
  import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-svelte'
  import styles from 'styles/tooltip.module.css'

  interface Tool {
    id: string
    label: string
    shortcut: string
  }

  const tools: Tool[] = [
    { id: 'bold', label: 'Bold', shortcut: '⌘+B' },
    { id: 'italic', label: 'Italic', shortcut: '⌘+I' },
    { id: 'underline', label: 'Underline', shortcut: '⌘+U' },
    { id: 'strikethrough', label: 'Strikethrough', shortcut: '⌘+⇧+X' },
  ]

  let activeTool = $state<Tool | null>(null)
</script>

<Tooltip.Root
  onTriggerValueChange={(e) => {
    activeTool = tools.find((t) => t.id === e.value) ?? null
  }}
>
  <div class={styles.Toolbar}>
    <Tooltip.Trigger value="bold" class={styles.ToolbarButton}>
      <BoldIcon />
    </Tooltip.Trigger>
    <Tooltip.Trigger value="italic" class={styles.ToolbarButton}>
      <ItalicIcon />
    </Tooltip.Trigger>
    <Tooltip.Trigger value="underline" class={styles.ToolbarButton}>
      <UnderlineIcon />
    </Tooltip.Trigger>
    <Tooltip.Trigger value="strikethrough" class={styles.ToolbarButton}>
      <StrikethroughIcon />
    </Tooltip.Trigger>
  </div>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content class={styles.Content}>
        {#if activeTool}
          {activeTool.label}
          <span class={styles.Shortcut}>{activeTool.shortcut}</span>
        {/if}
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>

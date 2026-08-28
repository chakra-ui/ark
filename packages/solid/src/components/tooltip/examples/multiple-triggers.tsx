import { Tooltip } from '@ark-ui/solid/tooltip'
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-solid'
import { type Component, For, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/tooltip.module.css'

interface Tool {
  id: string
  label: string
  shortcut: string
  icon: Component
}

const tools: Tool[] = [
  { id: 'bold', label: 'Bold', shortcut: '⌘+B', icon: BoldIcon },
  { id: 'italic', label: 'Italic', shortcut: '⌘+I', icon: ItalicIcon },
  { id: 'underline', label: 'Underline', shortcut: '⌘+U', icon: UnderlineIcon },
  { id: 'strikethrough', label: 'Strikethrough', shortcut: '⌘+⇧+X', icon: StrikethroughIcon },
]

export const MultipleTriggers = () => {
  const [activeTool, setActiveTool] = createSignal<Tool | null>(null)

  return (
    <Tooltip.Root
      onTriggerValueChange={(e) => {
        setActiveTool(tools.find((t) => t.id === e.value) ?? null)
      }}
    >
      <div class={styles.Toolbar}>
        <For each={tools}>
          {(tool) => (
            <Tooltip.Trigger value={tool.id} class={styles.ToolbarButton}>
              <tool.icon />
            </Tooltip.Trigger>
          )}
        </For>
      </div>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content class={styles.Content}>
            {activeTool() && (
              <>
                {activeTool()!.label} <span class={styles.Shortcut}>{activeTool()!.shortcut}</span>
              </>
            )}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  )
}

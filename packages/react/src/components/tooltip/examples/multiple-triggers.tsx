import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'
import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/tooltip.module.css'

interface Tool {
  id: string
  label: string
  shortcut: string
  icon: React.ElementType
}

const tools: Tool[] = [
  { id: 'bold', label: 'Bold', shortcut: '⌘+B', icon: BoldIcon },
  { id: 'italic', label: 'Italic', shortcut: '⌘+I', icon: ItalicIcon },
  { id: 'underline', label: 'Underline', shortcut: '⌘+U', icon: UnderlineIcon },
  { id: 'strikethrough', label: 'Strikethrough', shortcut: '⌘+⇧+X', icon: StrikethroughIcon },
]

export const MultipleTriggers = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null)

  return (
    <Tooltip.Root
      onTriggerValueChange={(e) => {
        setActiveTool(tools.find((t) => t.id === e.value) ?? null)
      }}
    >
      <div className={styles.Toolbar}>
        {tools.map((tool) => (
          <Tooltip.Trigger key={tool.id} value={tool.id} className={styles.ToolbarButton}>
            <tool.icon />
          </Tooltip.Trigger>
        ))}
      </div>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content className={styles.Content}>
            {activeTool && (
              <>
                {activeTool.label} <span className={styles.Shortcut}>{activeTool.shortcut}</span>
              </>
            )}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  )
}

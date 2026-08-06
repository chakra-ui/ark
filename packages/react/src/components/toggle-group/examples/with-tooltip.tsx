import { Portal } from '@ark-ui/react/portal'
import { ToggleGroup } from '@ark-ui/react/toggle-group'
import { Tooltip, useTooltip } from '@ark-ui/react/tooltip'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import styles from 'styles/toggle-group.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

const items = [
  { value: 'bold', label: 'Bold', icon: <BoldIcon /> },
  { value: 'italic', label: 'Italic', icon: <ItalicIcon /> },
  { value: 'underline', label: 'Underline', icon: <UnderlineIcon /> },
]

const getTriggerId = (value?: string) => `toggle-item:${value}`

export const WithTooltip = () => {
  const tooltip = useTooltip({ ids: { trigger: getTriggerId } })

  return (
    <Tooltip.RootProvider value={tooltip}>
      <ToggleGroup.Root defaultValue={['bold']} ids={{ item: getTriggerId }} className={styles.Root}>
        {items.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value} aria-label={item.label} className={styles.Item} asChild>
            <Tooltip.Trigger value={item.value}>{item.icon}</Tooltip.Trigger>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content className={tooltipStyles.Content}>
            {items.find((item) => item.value === tooltip.triggerValue)?.label}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.RootProvider>
  )
}

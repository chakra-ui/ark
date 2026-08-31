import { ToggleGroup } from '@ark-ui/solid/toggle-group'
import { Tooltip, useTooltip } from '@ark-ui/solid/tooltip'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { Portal } from 'solid-js/web'
import styles from 'styles/toggle-group.module.css'
import tooltipStyles from 'styles/tooltip.module.css'

const items = [
  { value: 'bold', label: 'Bold', icon: BoldIcon },
  { value: 'italic', label: 'Italic', icon: ItalicIcon },
  { value: 'underline', label: 'Underline', icon: UnderlineIcon },
]

const getTriggerId = (value?: string) => `toggle-item:${value}`

export const WithTooltip = () => {
  const tooltip = useTooltip({ ids: { trigger: getTriggerId } })

  return (
    <Tooltip.RootProvider value={tooltip}>
      <ToggleGroup.Root defaultValue={['bold']} ids={{ item: getTriggerId }} class={styles.Root}>
        <For each={items}>
          {(item) => (
            <ToggleGroup.Item
              value={item.value}
              aria-label={item.label}
              class={styles.Item}
              asChild={(itemProps) => (
                <Tooltip.Trigger value={item.value} {...itemProps()}>
                  <item.icon />
                </Tooltip.Trigger>
              )}
            />
          )}
        </For>
      </ToggleGroup.Root>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content class={tooltipStyles.Content}>
            {items.find((item) => item.value === tooltip().triggerValue)?.label}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.RootProvider>
  )
}

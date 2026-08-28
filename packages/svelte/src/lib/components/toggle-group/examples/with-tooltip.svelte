<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { ToggleGroup } from '@ark-ui/svelte/toggle-group'
  import { Tooltip, useTooltip } from '@ark-ui/svelte/tooltip'
  import BoldIcon from 'lucide-svelte/icons/bold'
  import ItalicIcon from 'lucide-svelte/icons/italic'
  import UnderlineIcon from 'lucide-svelte/icons/underline'
  import styles from 'styles/toggle-group.module.css'
  import tooltipStyles from 'styles/tooltip.module.css'

  const items = [
    { value: 'bold', label: 'Bold', icon: BoldIcon },
    { value: 'italic', label: 'Italic', icon: ItalicIcon },
    { value: 'underline', label: 'Underline', icon: UnderlineIcon },
  ]

  const getTriggerId = (value?: string) => `toggle-item:${value}`

  const id = $props.id()
  const tooltip = useTooltip({ id, ids: { trigger: getTriggerId } })
</script>

<Tooltip.RootProvider value={tooltip}>
  <ToggleGroup.Root defaultValue={['bold']} ids={{ item: getTriggerId }} class={styles.Root}>
    {#each items as item (item.value)}
      <ToggleGroup.Item value={item.value} aria-label={item.label} class={styles.Item}>
        {#snippet asChild(itemProps)}
          <Tooltip.Trigger value={item.value} {...itemProps()}>
            <item.icon />
          </Tooltip.Trigger>
        {/snippet}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content class={tooltipStyles.Content}>
        {items.find((item) => item.value === tooltip().triggerValue)?.label}
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.RootProvider>

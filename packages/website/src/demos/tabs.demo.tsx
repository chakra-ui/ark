import { Tabs, type TabsProps } from '~/components/ui'

export const Demo = (props: TabsProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'svelte', label: 'Svelte', disabled: true },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <Tabs.Root defaultValue="react" {...props}>
      <Tabs.List>
        {options.map((option) => (
          <Tabs.Trigger key={option.id} value={option.id} disabled={option.disabled}>
            {option.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="react">&nbsp;</Tabs.Content>
      <Tabs.Content value="solid">&nbsp;</Tabs.Content>
      <Tabs.Content value="svelte">&nbsp;</Tabs.Content>
      <Tabs.Content value="vue">&nbsp;</Tabs.Content>
    </Tabs.Root>
  )
}

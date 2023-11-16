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
      <Tabs.Content value="react">Are you familiar with React? You can try out Solid.</Tabs.Content>
      <Tabs.Content value="solid">
        Are you familiar with Solid? You can try out Svelte.
      </Tabs.Content>
      <Tabs.Content value="svelte">Are you familiar with Svelte? You can try out Vue.</Tabs.Content>
      <Tabs.Content value="vue">Are you familiar with Vue? You can try out React.</Tabs.Content>
    </Tabs.Root>
  )
}

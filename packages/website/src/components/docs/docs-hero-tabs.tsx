import { Tabs } from '~/components/ui'

export const DocsHeroTabs = () => {
  return (
    <Tabs.Root defaultValue="Overview" mb="-1px" variant="outline" size="lg">
      <Tabs.List>
        {['Overview', 'Anatomy', 'API'].map((item, id) => (
          <Tabs.Trigger key={id} value={item}>
            {item}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator />
      </Tabs.List>
    </Tabs.Root>
  )
}

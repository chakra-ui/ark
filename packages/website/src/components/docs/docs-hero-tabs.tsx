import { TabIndicator, TabList, TabTrigger, Tabs } from '~/components/ui'

export const DocsHeroTabs = () => {
  return (
    <Tabs defaultValue="Overview" mb="-1px" variant="outline" size="lg">
      <TabList>
        {['Overview', 'Anatomy', 'API'].map((item, id) => (
          <TabTrigger key={id} value={item}>
            {item}
          </TabTrigger>
        ))}
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

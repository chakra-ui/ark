import { TabIndicator, TabList, TabTrigger, Tabs, type TabsProps } from '~/components/ui/tabs'

export const TabsDemo = (props: TabsProps) => (
  <Tabs defaultValue="react" {...props}>
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabIndicator />
    </TabList>
  </Tabs>
)

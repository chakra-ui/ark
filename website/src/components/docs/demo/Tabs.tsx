import { tabs } from '@/panda/recipes'
import { TabIndicator, TabList, TabTrigger, Tabs, type TabsProps } from '@ark-ui/react'

export const DemoTabs = (props: Partial<TabsProps>) => (
  <Tabs className={tabs({})} defaultValue="react" {...props}>
    <TabList>
      <TabTrigger value="react">React</TabTrigger>
      <TabTrigger value="solid">Solid</TabTrigger>
      <TabTrigger value="vue">Vue</TabTrigger>
      <TabIndicator />
    </TabList>
  </Tabs>
)

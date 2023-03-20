import { tabs } from '@/panda/recipes'
import { TabIndicator, TabList, TabTrigger, Tabs, type TabsProps } from '@ark-ui/react'

export const DemoTabs = (props: Partial<TabsProps>) => (
  <Tabs className={tabs({})} defaultValue="react" {...props}>
    <TabList>
      <TabTrigger value="react">
        <button>React</button>
      </TabTrigger>
      <TabTrigger value="solid">
        <button>Solid</button>
      </TabTrigger>
      <TabTrigger value="vue">
        <button>Vue</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
  </Tabs>
)

import { TabIndicator, TabList, Tabs, TabsProps, TabTrigger } from '@ark-ui/react'
import { tabs } from '../../../panda/recipes'

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

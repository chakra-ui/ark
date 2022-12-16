import { TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { tabs } from '../../../panda/recipes'

export const DemoTabs = () => (
  <Tabs className={tabs({})} defaultValue="react">
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

import { TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { tabs } from '../../../panda/recipes'

export const ComponentTabs = () => (
  <Tabs className={tabs({})} defaultValue="overview">
    <TabList>
      <TabTrigger value="overview">
        <button>Overview</button>
      </TabTrigger>
      <TabTrigger value="props">
        <button>Props</button>
      </TabTrigger>
      <TabTrigger value="styling">
        <button>Styling</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
  </Tabs>
)

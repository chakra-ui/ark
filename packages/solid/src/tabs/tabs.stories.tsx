import { Tab } from './tab'
import { TabIndicator } from './tab-indicator'
import { TabList } from './tab-list'
import { TabPanel } from './tab-panel'
import { TabPanels } from './tab-panels'
import { Tabs } from './tabs'

export const Basic = () => (
  <Tabs value="three">
    <TabList>
      <Tab value="one">Item one</Tab>
      <Tab value="two" disabled>
        Item two
      </Tab>
      <Tab value="three">Item three</Tab>
      <TabIndicator />
    </TabList>
    <TabPanels>
      <TabPanel value="one">Value item one</TabPanel>
      <TabPanel value="two">Value item two</TabPanel>
      <TabPanel value="three">Value item three</TabPanel>
    </TabPanels>
  </Tabs>
)

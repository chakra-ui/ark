import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@atlas/react'

export const Basic = () => (
  <Tabs>
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

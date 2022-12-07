import { Tab } from './tab'
import { TabIndicator } from './tab-indicator'
import { TabList } from './tab-list'
import { TabPanel } from './tab-panel'
import { TabPanels } from './tab-panels'
import { Tabs } from './tabs'

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
    {/* <TabPanels> */}
    <TabPanel value="one">Value item one</TabPanel>
    <TabPanel value="two">Value item two</TabPanel>
    <TabPanel value="three">Value item three</TabPanel>
    {/* </TabPanels> */}
  </Tabs>
)

// TODO implement me
// export const Basic = () => (
//   <Tabs>
//     <TabList>
//       <TabTrigger value="one">
//         <button>click me</button>
//       </TabTrigger>
//       <TabIndicator />
//     </TabList>
//     <TabContent value="one">Value item one</TabContent>
//     <TabContent value="two">Value item one</TabContent>
//     <TabContent value="thre">Value item one</TabContent>
//   </Tabs>
// )

export const withDefaultValue = () => (
  <Tabs defaultValue="three">
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

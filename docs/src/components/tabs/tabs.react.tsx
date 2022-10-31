import { Tab, TabContent, TabContentGroup, TabList, Tabs } from '@atlas/react'

export const Basic = () => {
  return (
    <Tabs>
      <TabList>
        <Tab value="one">Item one</Tab>
        <Tab value="two">Item two</Tab>
        <Tab value="three">Item three</Tab>
      </TabList>
      <TabContentGroup>
        <TabContent value="one">Value item one</TabContent>
        <TabContent value="two">Value item two</TabContent>
        <TabContent value="three">Value item three</TabContent>
      </TabContentGroup>
      <TabContent value="one">Value item one</TabContent>
      <TabContent value="two">Value item two</TabContent>
      <TabContent value="three">Value item three</TabContent>
    </Tabs>
  )
}

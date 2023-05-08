import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '.'

export const Basic = () => (
  <Tabs value="three">
    <TabList>
      <TabTrigger asChild value="one">
        <button>Item one</button>
      </TabTrigger>
      <TabTrigger asChild value="two" disabled>
        <button>Item two</button>
      </TabTrigger>
      <TabTrigger asChild value="three">
        <button>Item three</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Value item one</TabContent>
    <TabContent value="two">Value item two</TabContent>
    <TabContent value="three">Value item three</TabContent>
  </Tabs>
)

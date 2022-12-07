import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '.'

export const Basic = () => (
  <Tabs value="three">
    <TabList>
      <TabTrigger value="one">
        <button>Item one</button>
      </TabTrigger>
      <TabTrigger value="two" disabled>
        <button>Item two</button>
      </TabTrigger>
      <TabTrigger value="three">
        <button>Item three</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Value item one</TabContent>
    <TabContent value="two">Value item two</TabContent>
    <TabContent value="three">Value item three</TabContent>
  </Tabs>
)

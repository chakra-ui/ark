import type { Meta } from 'storybook-solidjs'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '.'

const meta: Meta = {
  title: 'Tabs',
}

export default meta

export const Basic = () => (
  <Tabs value="three">
    <TabList>
      <TabTrigger value="one">Item one</TabTrigger>
      <TabTrigger value="two" disabled>
        Item two
      </TabTrigger>
      <TabTrigger value="three">Item three</TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Value item one</TabContent>
    <TabContent value="two">Value item two</TabContent>
    <TabContent value="three">Value item three</TabContent>
  </Tabs>
)

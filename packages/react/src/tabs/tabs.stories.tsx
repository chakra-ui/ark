import type { Meta } from '@storybook/react'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '.'

type TabContentType = typeof TabContent

const meta: Meta<TabContentType> = {
  title: 'TabContent',
  component: TabContent,
}

export default meta

export const Basic = () => (
  <Tabs>
    <TabList>
      <TabTrigger value="one">Item one</TabTrigger>
      <TabTrigger value="two">Item two</TabTrigger>
      <TabTrigger value="three" disabled>
        Item three
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="one">Value item one</TabContent>
    <TabContent value="two">Value item two</TabContent>
    <TabContent value="three">Value item three</TabContent>
  </Tabs>
)

export const WithDefaultValue = () => (
  <Tabs defaultValue="three">
    <TabList>
      <TabTrigger value="one">Item one </TabTrigger>
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

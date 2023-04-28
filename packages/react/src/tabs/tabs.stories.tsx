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

export const WithDefaultValue = () => (
  <Tabs defaultValue="three">
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

import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '.'

import type { Meta } from '@storybook/react'

type TabsType = typeof Tabs

const meta: Meta<TabsType> = {
  title: 'Tabs',
  component: Tabs,
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

export const withDefaultValue = () => (
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

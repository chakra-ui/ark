'use client'
import { tabs } from '@/panda/recipes'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { Stack } from 'panda/jsx/stack'

type ComponentTabsProps = {
  overview: React.ReactNode
  playground: React.ReactNode
  properties: React.ReactNode
}

export const ComponentTabs = (props: ComponentTabsProps) => (
  <Tabs className={tabs({ size: 'sm' })} defaultValue="overview">
    <TabList>
      <TabTrigger value="overview">
        <button>Overview</button>
      </TabTrigger>
      <TabTrigger value="props">
        <button>Properties</button>
      </TabTrigger>
      <TabTrigger value="styling">
        <button>Styling</button>
      </TabTrigger>
      <TabIndicator />
    </TabList>
    <TabContent value="overview">
      <Stack gap="12">
        {props.playground}
        {props.overview}
      </Stack>
    </TabContent>
    <TabContent value="props">{props.properties}</TabContent>
    <TabContent value="styling">
      <h2>Styling</h2>
    </TabContent>
  </Tabs>
)

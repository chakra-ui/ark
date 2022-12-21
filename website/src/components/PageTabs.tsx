'use client'
import { TabContent, TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { useRouter } from 'next/navigation'
import { tabs } from '../../panda/recipes'

type PageTabsProps = {
  value: string
}

export const PageTabs = (props: PageTabsProps) => {
  const { value } = props
  const router = useRouter()
  return (
    <Tabs
      className={tabs({})}
      defaultValue={value}
      onChange={(x) => router.push(`/tabs/${x.value}`)}
    >
      <TabList>
        <TabTrigger value="overview">
          <button>Overview</button>
        </TabTrigger>
        <TabTrigger value="props">
          <button>Props</button>
        </TabTrigger>
        <TabTrigger value="styling">
          <button>Styling</button>
        </TabTrigger>
        <TabIndicator />
      </TabList>
      <TabContent value="overview">
        <h2>Overview</h2>
      </TabContent>
      <TabContent value="props">
        <h2>Props</h2>
      </TabContent>
      <TabContent value="styling">
        <h2>Styling</h2>
      </TabContent>
    </Tabs>
  )
}

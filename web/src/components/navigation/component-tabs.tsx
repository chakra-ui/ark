import { TabIndicator, TabList, TabTrigger, Tabs } from '../ui/tabs'

interface Props {
  currentTab: string
}

export const ComponentTabs = (props: Props) => {
  const { currentTab } = props
  return (
    <Tabs defaultValue={currentTab} orientation="horizontal">
      <TabList>
        <TabTrigger value="usage" asChild>
          <a href="usage">Usage</a>
        </TabTrigger>
        <TabTrigger value="types" asChild>
          <a href="types">Types</a>
        </TabTrigger>
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

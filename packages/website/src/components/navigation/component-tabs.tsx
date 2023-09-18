import { TabIndicator, TabList, TabTrigger, Tabs } from '../ui/tabs'

interface Props {
  pathname: string
  basePath: string
}

export const ComponentTabs = (props: Props) => {
  const { basePath, pathname } = props
  return (
    <Tabs defaultValue={pathname} orientation="horizontal">
      <TabList>
        <TabTrigger value={basePath} asChild>
          <a href={basePath}>Usage</a>
        </TabTrigger>
        <TabTrigger value={basePath + '/types'} asChild>
          <a href={basePath + '/types'}>Types</a>
        </TabTrigger>
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

import { TabIndicator, TabList, TabTrigger, Tabs } from '../ui/tabs'

interface Props {
  items: { id: string; slug: string; title: string }[]
  currentValue?: string
}

export const SidebarGroup = (props: Props) => {
  const { items, currentValue } = props
  return (
    <Tabs defaultValue={currentValue} orientation="vertical" size="sm">
      <TabList>
        {items.map((item, id) => (
          <TabTrigger key={id} value={item.id} asChild width="fit-content">
            <a href={item.slug}>{item.title}</a>
          </TabTrigger>
        ))}
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

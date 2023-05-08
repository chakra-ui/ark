'use client'
import { tabs } from '@/panda/recipes'
import { TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type ComponentTabsProps = {
  basePath: string
}

export const ComponentTabs = (props: ComponentTabsProps) => {
  const pathname = usePathname()

  const lastSegment = pathname?.split('/').pop() ?? 'usage'
  const defaultValue = ['usage', 'props'].includes(lastSegment) ? lastSegment : 'usage'

  return (
    <Tabs className={tabs()} defaultValue={defaultValue}>
      <TabList>
        <TabTrigger value="usage" asChild>
          <Link href={props.basePath + '/usage'}>Usage</Link>
        </TabTrigger>
        <TabTrigger value="props" asChild>
          <Link href={props.basePath + '/props'}>Properties</Link>
        </TabTrigger>
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

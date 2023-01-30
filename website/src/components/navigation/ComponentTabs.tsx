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

  const lastSegment = pathname?.split('/').pop() ?? 'overview'
  const defaultValue = ['overview', 'props'].includes(lastSegment) ? lastSegment : 'overview'

  return (
    <Tabs className={tabs({ size: 'sm' })} defaultValue={defaultValue}>
      <TabList>
        <TabTrigger value="overview">
          <Link href={props.basePath + '/overview'}>Overview</Link>
        </TabTrigger>
        <TabTrigger value="props">
          <Link href={props.basePath + '/props'}>Properties</Link>
        </TabTrigger>
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

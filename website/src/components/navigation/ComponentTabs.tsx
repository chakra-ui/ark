'use client'
import { tabs } from '@/panda/recipes'
import { TabIndicator, TabList, Tabs, TabTrigger } from '@ark-ui/react'
import { usePathname, useRouter } from 'next/navigation'

type ComponentTabsProps = {
  basePath: string
}

export const ComponentTabs = (props: ComponentTabsProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const lastSegment = pathname?.split('/').pop() ?? 'overview'
  const defaultValue = ['overview', 'props'].includes(lastSegment) ? lastSegment : 'overview'

  return (
    <Tabs
      className={tabs({ size: 'sm' })}
      defaultValue={defaultValue}
      onChange={({ value }) => router.push([props.basePath, value].join('/'))}
    >
      <TabList>
        <TabTrigger value="overview">
          <button>Overview</button>
        </TabTrigger>
        <TabTrigger value="props">
          <button>Properties</button>
        </TabTrigger>
        <TabIndicator />
      </TabList>
    </Tabs>
  )
}

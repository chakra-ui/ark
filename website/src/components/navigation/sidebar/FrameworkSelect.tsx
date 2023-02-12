'use client'
import { usePathname } from 'next/navigation'
import { SidebarItemGroup } from './SidebarItemGroup'

export const FrameworkSelect = () => {
  const pathName = usePathname()

  return (
    <SidebarItemGroup
      heading="Framework"
      items={[
        {
          label: 'React',
          href: pathName?.replace(/\/(solid|vue|react)\//, `/react/`) ?? '#',
        },
        {
          label: 'SolidJS',
          href: pathName?.replace(/\/(solid|vue|react)\//, `/solid/`) ?? '#',
        },
        {
          label: 'Vue.js',
          href: pathName?.replace(/\/(solid|vue|react)\//, `/vue/`) ?? '#',
        },
      ]}
    />
  )
}

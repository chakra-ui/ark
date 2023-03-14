'use client'
import { Text } from '@/components/shared/Text'
import { Stack } from '@/panda/jsx'
import { link } from '@/panda/recipes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type SidebarItemGroupProps = {
  heading: string
  items: {
    href: string
    label: string
  }[]
}

export const SidebarItemGroup = (props: SidebarItemGroupProps) => {
  const { heading, items } = props
  const pathname = usePathname()
  return (
    <Stack gap={{ base: '6', lg: '3' }}>
      <Text
        fontSize={{ base: 'md', lg: 'sm' }}
        lineHeight="1.5rem"
        fontWeight="semibold"
        color="accent.muted"
      >
        {heading}
      </Text>
      <Stack borderLeftWidth="1px" gap={{ base: '5', lg: '2' }}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={link({ variant: 'sidebar' })}
            aria-current={pathname?.includes(item.href) ? 'page' : false}
          >
            {item.label}
          </Link>
        ))}
      </Stack>
    </Stack>
  )
}

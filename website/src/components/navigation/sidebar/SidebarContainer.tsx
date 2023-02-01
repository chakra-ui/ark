import { css } from '@/panda/css'
import { panda } from '@/panda/jsx'
import type { PropsWithChildren } from 'react'

export const SidebarContainer = (props: PropsWithChildren) => (
  <panda.aside
    className={css({
      '--header-height': 'sizes.18',
    })}
    display={{ base: 'none', lg: 'block' }}
    position="sticky"
    top="var(--header-height)"
    py="8"
    pr="16"
    maxH="calc(100vh - var(--header-height))"
    overflowY="auto"
    {...props}
  />
)

import type { PropsWithChildren } from 'react'
import { cx } from 'styled-system/css'
import { Box } from 'styled-system/jsx'
import { getFramework } from '~/lib/frameworks'
import { VersionSelect } from './version-select'

interface Props {
  className?: string
}

export const SidebarContainer = async (props: PropsWithChildren<Props>) => {
  const { className } = props

  const framework = await getFramework()
  const version = await fetchLatestVersion(framework)

  return (
    <aside className={cx('scroller', className)}>
      <Box pt="6" pb="3">
        <div id="version-select">
          <VersionSelect latest={version} />
        </div>
      </Box>
      {props.children}
    </aside>
  )
}

const fetchLatestVersion = async (framework: string) => {
  const response = await fetch(`https://registry.npmjs.org/@ark-ui/${framework}/latest`, {
    next: { revalidate: 3600 },
  })
  const data = await response.json()

  return data.version as string
}

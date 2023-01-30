'use client'
import { useScrollSpy } from '@/lib/useScrollSpy'
import { panda, Stack } from '@/panda/jsx'
import type { TOCEntry } from 'markdown-toc'
import { Link } from '../shared/Link'
import { Text } from '../shared/Text'

interface Props {
  entries: TOCEntry[]
}

export const TableOfContent = (props: Props) => {
  const { entries } = props
  const activeId = useScrollSpy(props.entries.map((item) => '#' + item.slug))

  return (
    <panda.aside
      position="sticky"
      display={{ base: 'none', xl: 'block' }}
      top="112px"
      width="256px"
    >
      <Stack gap="3">
        <Text textStyle="sm" fontWeight="semibold">
          On this page
        </Text>
        <Stack>
          {entries.map((item, id) => (
            <Link
              key={id}
              href={`#${item.slug}`}
              variant="toc"
              aria-current={(activeId ?? entries[0].slug) === item.slug ? 'page' : false}
            >
              {item.content}
            </Link>
          ))}
        </Stack>
      </Stack>
    </panda.aside>
  )
}

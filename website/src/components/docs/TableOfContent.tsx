'use client'
import { useScrollSpy } from '@/lib/useScrollSpy'
import { Box, Stack } from '@/panda/jsx'
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
    <Box as="aside" position="sticky" display={{ base: 'none', xl: 'block' }} top="112px" flex="1">
      <Stack gap="4">
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
    </Box>
  )
}

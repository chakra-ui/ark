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
  const activeId = useScrollSpy(entries.map((item) => item.slug))
  return (
    <Box
      display={{ base: 'none', xl: 'flex' }}
      position="fixed"
      width="15rem"
      top="16"
      pt="8"
      bottom="0"
      right="max(0px, calc(100vw / 2 - 640px))"
    >
      <Stack gap="3">
        <Text textStyle="sm" fontWeight="semibold" color="accent.muted">
          On this page
        </Text>
        <Stack>
          {entries.map((item, id) => (
            <Link
              key={id}
              id={item.slug}
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

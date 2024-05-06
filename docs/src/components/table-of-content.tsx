'use client'
import { SegmentGroup, Text } from './ui'

interface TocEntry {
  /**
   * Title of the entry
   */
  title: string
  /**
   * URL that can be used to reach
   * the content
   */
  url: string
  /**
   * Nested items
   */
  items: TocEntry[]
}

interface Props {
  entries?: TocEntry[]
}

export const TableOfContent = (props: Props) => {
  const { entries = [] } = props
  return (
    <nav style={{ position: 'fixed' }}>
      <Text textStyle="sm" fontWeight="semibold" py="1.5" borderLeftWidth="1px" ps="4">
        On this page
      </Text>
      <SegmentGroup.Root orientation="vertical" size={{ base: 'md', md: 'sm' }} gap="0">
        {entries.map((entry) => (
          <a key={entry.url} href={entry.url} style={{ display: 'flex', width: 'fit-content' }}>
            <SegmentGroup.Item
              value={entry.url}
              data-orientation="vertical"
              fontWeight="normal"
              px="4"
            >
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>{entry.title}</SegmentGroup.ItemText>
            </SegmentGroup.Item>
          </a>
        ))}
        <SegmentGroup.Indicator borderColor="#EB5E41" />
      </SegmentGroup.Root>
    </nav>
  )
}

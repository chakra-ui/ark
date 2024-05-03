import { Stack, styled } from 'styled-system/jsx'

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
    <Stack gap="3">
      <styled.p textStyle={{ base: 'md', md: 'sm' }} fontWeight="semibold">
        On this page
      </styled.p>
      <Stack>
        {entries.map((entry) => (
          <Stack key={entry.url} gap="2">
            <styled.a href={entry.url} textStyle={{ base: 'md', md: 'sm' }} fontWeight="semibold">
              {entry.title}
            </styled.a>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

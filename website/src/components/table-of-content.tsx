'use client'
import { useWindowScroll } from '@uidotdev/usehooks'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'
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
  const entries = flattenTocEntries(props.entries)
  const activeItem = useScrollSpy(entries.map((entry) => entry.url))
  const router = useRouter()
  const [{ y }] = useWindowScroll()

  return (
    <nav>
      <Text textStyle="sm" fontWeight="semibold" py="1.5" borderLeftWidth="1px" ps="4">
        On this page
      </Text>
      <SegmentGroup.Root
        onValueChange={(details) => router.push(details.value)}
        value={y && y > 32 ? activeItem : ''}
        orientation="vertical"
        size={{ base: 'md', md: 'sm' }}
        gap="0"
      >
        {entries.map((entry) => (
          <a key={entry.url} href={entry.url} style={{ display: 'flex', width: 'fit-content' }}>
            <SegmentGroup.Item
              value={entry.url}
              data-orientation="vertical"
              fontWeight="normal"
              ps={entry.depth === 0 ? '4' : '8'}
              pe="4"
            >
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>{entry.title}</SegmentGroup.ItemText>
            </SegmentGroup.Item>
          </a>
        ))}
        <SegmentGroup.Indicator />
      </SegmentGroup.Root>
    </nav>
  )
}

interface FlattenedTocEntry extends Omit<TocEntry, 'items'> {
  depth: number
}

const flattenTocEntries = (entries: TocEntry[] = [], depth = 0): FlattenedTocEntry[] =>
  entries.reduce<FlattenedTocEntry[]>(
    (acc, entry) =>
      acc.concat(
        { title: entry.title, url: entry.url, depth },
        flattenTocEntries(entry.items, depth + 1),
      ),
    [],
  )

const useScrollSpy = (selectors: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(selectors[0])
  const [previousId, setPreviousId] = useState<string | null>()
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = selectors.map((selector) =>
      document.querySelector(`[id='${selector.replace('#', '')}']`),
    )

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.getAttribute('id')}`
          if (entry?.isIntersecting) {
            setPreviousId(activeId)
            setActiveId(id)
          } else {
            if (id === previousId) {
              setPreviousId(null)
            }
            if (activeId === id && previousId) {
              setActiveId(previousId)
            }
          }
        }
      },
      { rootMargin: '-30% 0px' },
    )

    for (const element of elements) {
      if (element) observer.current?.observe(element)
    }
    return () => observer.current?.disconnect()
  }, [selectors, previousId, activeId])

  return activeId
}

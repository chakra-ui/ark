'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
  const activeItem = useScrollSpy(entries.map((entry) => entry.url))
  const router = useRouter()

  return (
    <nav>
      <Text textStyle="sm" fontWeight="semibold" py="1.5" borderLeftWidth="1px" ps="4">
        On this page
      </Text>
      <SegmentGroup.Root
        onValueChange={(details) => router.push(details.value)}
        value={activeItem}
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

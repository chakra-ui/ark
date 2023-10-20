import type { MarkdownHeading } from 'astro'
import { useEffect, useRef, useState } from 'react'
import { Stack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { SidebarGroup } from './sidebar-group'

interface Props {
  headings?: MarkdownHeading[]
}

export const TableOfContent = (props: Props) => {
  const { headings = [] } = props
  const items = headings
    .filter((heading) => heading.depth === 2)
    .map((heading) => ({ title: heading.text, href: '#' + heading.slug }))

  const activeItem = useScrollSpy(items.map((item) => item.href))
  return (
    <Stack gap="3">
      <Text textStyle={{ base: 'md', md: 'sm' }} fontWeight="semibold">
        On this page
      </Text>
      <Stack>
        <SidebarGroup items={items} activeItem={activeItem} />
      </Stack>
    </Stack>
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
        entries.forEach((entry) => {
          const id = '#' + entry.target.getAttribute('id')

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
        })
      },
      { rootMargin: '-30% 0px' },
    )
    elements.forEach((element) => {
      if (element) observer.current?.observe(element)
    })
    return () => observer.current?.disconnect()
  }, [selectors])

  return activeId
}

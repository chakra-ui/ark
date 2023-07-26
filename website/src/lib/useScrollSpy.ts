import { useEffect, useRef, useState } from 'react'

export const useScrollSpy = (selectors: string[]) => {
  const [activeId, setActiveId] = useState<string | null>()
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = selectors.map((selector) => document.querySelector(`#${CSS.escape(selector)}`))
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting) {
            setActiveId(entry.target.getAttribute('id'))
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' },
    )
    elements.forEach((element) => {
      if (element) observer.current?.observe(element)
    })
    return () => observer.current?.disconnect()
  }, [selectors])

  return activeId
}

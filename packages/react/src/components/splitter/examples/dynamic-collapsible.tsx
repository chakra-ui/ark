import { Splitter, useSplitter } from '@ark-ui/react/splitter'
import { useLayoutEffect, useRef, useState } from 'react'

export const DynamicCollapsible = () => {
  const [rootSize, setRootSize] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const handleResize = () => setRootSize(ref.current?.offsetWidth ?? null)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isBelowMd = rootSize != null && rootSize < 600

  useLayoutEffect(() => {
    if (isBelowMd) splitter.collapsePanel('a')
    else splitter.expandPanel('a')
  }, [isBelowMd])

  const splitter = useSplitter({
    panels: [{ id: 'a', collapsible: isBelowMd, collapsedSize: 5, minSize: 20, maxSize: 40 }, { id: 'b' }],
    defaultSize: [15, 85],
  })

  return (
    <Splitter.RootProvider value={splitter} ref={ref}>
      <Splitter.Panel id="a" style={{ background: '#f0f0f0', padding: '20px' }}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" style={{ background: '#e0e0e0', padding: '20px' }}>
        B
      </Splitter.Panel>
    </Splitter.RootProvider>
  )
}

/** biome-ignore-all lint/correctness/useExhaustiveDependencies: intentional */

import { Splitter, useSplitter } from '@ark-ui/react/splitter'
import { useLayoutEffect, useRef, useState } from 'react'
import styles from 'styles/splitter.module.css'

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
    <Splitter.RootProvider className={styles.Root} value={splitter} ref={ref}>
      <Splitter.Panel className={styles.Panel} id="a">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger className={styles.ResizeTrigger} id="a:b" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator className={styles.ResizeTriggerIndicator} />
      </Splitter.ResizeTrigger>
      <Splitter.Panel className={styles.Panel} id="b">
        B
      </Splitter.Panel>
    </Splitter.RootProvider>
  )
}

import { Splitter, useSplitter } from '@ark-ui/solid/splitter'
import { createEffect, createSignal, onMount } from 'solid-js'
import styles from 'styles/splitter.module.css'

export const DynamicCollapsible = () => {
  const [rootSize, setRootSize] = createSignal<number | null>(null)
  let ref: HTMLDivElement | undefined

  onMount(() => {
    const handleResize = () => setRootSize(ref?.offsetWidth ?? null)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const isBelowMd = () => rootSize() != null && rootSize()! < 600

  const splitter = useSplitter(() => ({
    panels: [{ id: 'a', collapsible: isBelowMd(), collapsedSize: 5, minSize: 20, maxSize: 40 }, { id: 'b' }],
    defaultSize: [15, 85],
  }))

  createEffect(() => {
    if (isBelowMd()) splitter().collapsePanel('a')
    else splitter().expandPanel('a')
  })

  return (
    <Splitter.RootProvider class={styles.Root} value={splitter} ref={(el) => (ref = el)}>
      <Splitter.Panel class={styles.Panel} id="a">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
      </Splitter.ResizeTrigger>
      <Splitter.Panel class={styles.Panel} id="b">
        B
      </Splitter.Panel>
    </Splitter.RootProvider>
  )
}

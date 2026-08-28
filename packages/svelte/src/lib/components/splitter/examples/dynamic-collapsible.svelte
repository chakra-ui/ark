<script lang="ts">
  import { Splitter, useSplitter } from '@ark-ui/svelte/splitter'
  import { onMount } from 'svelte'
  import styles from 'styles/splitter.module.css'

  let rootRef: HTMLDivElement
  let rootSize = $state<number | null>(null)

  const isBelowMd = $derived(rootSize != null && rootSize < 600)

  const splitter = useSplitter(() => ({
    panels: [{ id: 'a', collapsible: isBelowMd, collapsedSize: 5, minSize: 20, maxSize: 40 }, { id: 'b' }],
    defaultSize: [15, 85],
  }))

  $effect(() => {
    if (isBelowMd) splitter().collapsePanel('a')
    else splitter().expandPanel('a')
  })

  onMount(() => {
    const handleResize = () => {
      rootSize = rootRef?.offsetWidth ?? null
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })
</script>

<div bind:this={rootRef} style="width: 100%">
  <Splitter.RootProvider class={styles.Root} value={splitter}>
    <Splitter.Panel class={styles.Panel} id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize panels">
      <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel class={styles.Panel} id="b">B</Splitter.Panel>
  </Splitter.RootProvider>
</div>

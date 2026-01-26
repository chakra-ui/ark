<script lang="ts">
  import { Splitter, useSplitter } from '@ark-ui/svelte/splitter'
  import styles from 'styles/splitter.module.css'

  const id = $props.id()
  const splitter = useSplitter({
    id,
    defaultSize: [50, 50],
    panels: [{ id: 'a' }, { id: 'b' }],
  })
</script>

<div class="stack">
  <output>current size: {JSON.stringify(splitter().getSizes())}</output>

  <Splitter.RootProvider class={styles.Root} value={splitter}>
    <Splitter.Panel class={styles.Panel} id="a">A</Splitter.Panel>
    <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel class={styles.Panel} id="b">B</Splitter.Panel>
  </Splitter.RootProvider>
</div>

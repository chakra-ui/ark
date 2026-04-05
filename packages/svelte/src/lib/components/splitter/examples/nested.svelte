<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
  import styles from 'styles/splitter.module.css'

  const registry = Splitter.createRegistry()
</script>

<Splitter.Root
  class={styles.Root}
  orientation="horizontal"
  panels={[{ id: 'left' }, { id: 'center' }, { id: 'right' }]}
  {registry}
>
  <Splitter.Panel class={styles.Panel} id="left">Left</Splitter.Panel>
  <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="left:center" aria-label="Resize">
    <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
  </Splitter.ResizeTrigger>
  <Splitter.Panel class={styles.Panel} id="center">
    <Splitter.Root orientation="vertical" panels={[{ id: 'top' }, { id: 'bottom' }]} {registry}>
      <Splitter.Panel class={styles.Panel} id="top">Top</Splitter.Panel>
      <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="top:bottom" aria-label="Resize">
        <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
      </Splitter.ResizeTrigger>
      <Splitter.Panel class={styles.Panel} id="bottom">Bottom</Splitter.Panel>
    </Splitter.Root>
  </Splitter.Panel>
  <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="center:right" aria-label="Resize">
    <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
  </Splitter.ResizeTrigger>
  <Splitter.Panel class={styles.Panel} id="right">Right</Splitter.Panel>
</Splitter.Root>

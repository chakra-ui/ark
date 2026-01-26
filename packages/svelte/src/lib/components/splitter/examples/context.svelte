<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
  import styles from 'styles/splitter.module.css'
</script>

<Splitter.Root class={styles.Root} panels={[{ id: 'a' }, { id: 'b' }]}>
  <Splitter.Context>
    {#snippet render(splitter)}
      <Splitter.Panel class={styles.Panel} id="a">
        <button type="button" onclick={() => splitter().resizePanel('a', 10)}>Set to 10%</button>
      </Splitter.Panel>
      <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize">
        <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
      </Splitter.ResizeTrigger>
      <Splitter.Panel class={styles.Panel} id="b">
        <button type="button" onclick={() => splitter().resizePanel('b', 10)}>Set to 10%</button>
      </Splitter.Panel>
    {/snippet}
  </Splitter.Context>
</Splitter.Root>

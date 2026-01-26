<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
  import styles from 'styles/splitter.module.css'
</script>

<Splitter.Root class={styles.Root} panels={[{ id: 'a' }, { id: 'b' }]}>
  <Splitter.Panel class={styles.Panel} id="a">A</Splitter.Panel>
  <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize">
    <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
  </Splitter.ResizeTrigger>
  <Splitter.Panel class={styles.Panel} id="b">B</Splitter.Panel>
</Splitter.Root>

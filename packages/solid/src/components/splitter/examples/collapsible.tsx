import { Splitter } from '@ark-ui/solid/splitter'
import styles from 'styles/splitter.module.css'

export const Collapsible = () => (
  <Splitter.Root
    class={styles.Root}
    defaultSize={[15, 20]}
    panels={[
      { id: 'a', collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
      { id: 'b', minSize: 50 },
    ]}
  >
    <Splitter.Panel class={styles.Panel} id="a">
      A
    </Splitter.Panel>
    <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel class={styles.Panel} id="b">
      B
    </Splitter.Panel>
  </Splitter.Root>
)

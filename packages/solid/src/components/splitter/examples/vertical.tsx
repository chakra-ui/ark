import { Splitter } from '@ark-ui/solid/splitter'
import styles from 'styles/splitter.module.css'

export const Vertical = () => (
  <Splitter.Root class={styles.Root} orientation="vertical" panels={[{ id: 'a' }, { id: 'b' }]}>
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

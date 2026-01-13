import { Splitter } from '@ark-ui/react/splitter'
import styles from 'styles/splitter.module.css'

export const MultiplePanels = () => (
  <Splitter.Root
    className={styles.Root}
    panels={[
      { id: 'a', minSize: 20 },
      { id: 'b', minSize: 40 },
      { id: 'c', minSize: 20 },
    ]}
    defaultSize={[20, 60, 20]}
  >
    <Splitter.Panel className={styles.Panel} id="a">
      A
    </Splitter.Panel>
    <Splitter.ResizeTrigger className={styles.ResizeTrigger} id="a:b" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator className={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel className={styles.Panel} id="b">
      B
    </Splitter.Panel>
    <Splitter.ResizeTrigger className={styles.ResizeTrigger} id="b:c" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator className={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel className={styles.Panel} id="c">
      C
    </Splitter.Panel>
  </Splitter.Root>
)

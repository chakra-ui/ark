import { Splitter } from '@ark-ui/react/splitter'
import styles from 'styles/splitter.module.css'

export const Basic = () => (
  <Splitter.Root className={styles.Root} panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Panel className={styles.Panel} id="a">
      A
    </Splitter.Panel>
    <Splitter.ResizeTrigger className={styles.ResizeTrigger} id="a:b" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator className={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel className={styles.Panel} id="b">
      B
    </Splitter.Panel>
  </Splitter.Root>
)

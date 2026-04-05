import { Splitter } from '@ark-ui/solid/splitter'
import styles from 'styles/splitter.module.css'

const registry = Splitter.createRegistry()

export const Nested = () => (
  <Splitter.Root
    class={styles.Root}
    orientation="horizontal"
    panels={[{ id: 'left' }, { id: 'center' }, { id: 'right' }]}
    registry={registry}
  >
    <Splitter.Panel class={styles.Panel} id="left">
      Left
    </Splitter.Panel>
    <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="left:center" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel class={styles.Panel} id="center">
      <Splitter.Root orientation="vertical" panels={[{ id: 'top' }, { id: 'bottom' }]} registry={registry}>
        <Splitter.Panel class={styles.Panel} id="top">
          Top
        </Splitter.Panel>
        <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="top:bottom" aria-label="Resize">
          <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
        </Splitter.ResizeTrigger>
        <Splitter.Panel class={styles.Panel} id="bottom">
          Bottom
        </Splitter.Panel>
      </Splitter.Root>
    </Splitter.Panel>
    <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="center:right" aria-label="Resize">
      <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
    </Splitter.ResizeTrigger>
    <Splitter.Panel class={styles.Panel} id="right">
      Right
    </Splitter.Panel>
  </Splitter.Root>
)

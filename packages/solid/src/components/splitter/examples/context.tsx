import { Splitter } from '@ark-ui/solid/splitter'
import button from 'styles/button.module.css'
import styles from 'styles/splitter.module.css'

export const Context = () => (
  <Splitter.Root class={styles.Root} panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Context>
      {(splitter) => (
        <>
          <Splitter.Panel class={styles.Panel} id="a">
            <button class={button.Root} type="button" onClick={() => splitter().resizePanel('a', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
          <Splitter.ResizeTrigger class={styles.ResizeTrigger} id="a:b" aria-label="Resize">
            <Splitter.ResizeTriggerIndicator class={styles.ResizeTriggerIndicator} />
          </Splitter.ResizeTrigger>
          <Splitter.Panel class={styles.Panel} id="b">
            <button class={button.Root} type="button" onClick={() => splitter().resizePanel('b', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
        </>
      )}
    </Splitter.Context>
  </Splitter.Root>
)

import { Splitter } from '@ark-ui/react/splitter'
import button from 'styles/button.module.css'
import styles from 'styles/splitter.module.css'

export const Context = () => (
  <Splitter.Root className={styles.Root} panels={[{ id: 'a' }, { id: 'b' }]}>
    <Splitter.Context>
      {(splitter) => (
        <>
          <Splitter.Panel className={styles.Panel} id="a">
            <button className={button.Root} type="button" onClick={() => splitter.resizePanel('a', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
          <Splitter.ResizeTrigger className={styles.ResizeTrigger} id="a:b" aria-label="Resize">
            <Splitter.ResizeTriggerIndicator className={styles.ResizeTriggerIndicator} />
          </Splitter.ResizeTrigger>
          <Splitter.Panel className={styles.Panel} id="b">
            <button className={button.Root} type="button" onClick={() => splitter.resizePanel('b', 10)}>
              Set to 10%
            </button>
          </Splitter.Panel>
        </>
      )}
    </Splitter.Context>
  </Splitter.Root>
)

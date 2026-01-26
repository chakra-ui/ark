import { Splitter, useSplitter } from '@ark-ui/react/splitter'
import styles from 'styles/splitter.module.css'

export const RootProvider = () => {
  const splitter = useSplitter({
    defaultSize: [50, 50],
    panels: [{ id: 'a' }, { id: 'b' }],
  })

  return (
    <div className="stack">
      <output>current size: {JSON.stringify(splitter.getSizes())}</output>

      <Splitter.RootProvider className={styles.Root} value={splitter}>
        <Splitter.Panel className={styles.Panel} id="a">
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger className={styles.ResizeTrigger} id="a:b" aria-label="Resize">
          <Splitter.ResizeTriggerIndicator className={styles.ResizeTriggerIndicator} />
        </Splitter.ResizeTrigger>
        <Splitter.Panel className={styles.Panel} id="b">
          B
        </Splitter.Panel>
      </Splitter.RootProvider>
    </div>
  )
}

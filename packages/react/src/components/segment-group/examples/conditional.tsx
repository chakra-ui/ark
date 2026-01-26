import { SegmentGroup } from '@ark-ui/react/segment-group'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/segment-group.module.css'

export const Conditional = () => {
  const [show, setShow] = useState(false)
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
      {show && (
        <SegmentGroup.Root className={styles.Root} defaultValue="React">
          <SegmentGroup.Indicator className={styles.Indicator} />
          {frameworks.map((framework) => (
            <SegmentGroup.Item className={styles.Item} key={framework} value={framework}>
              <SegmentGroup.ItemText className={styles.ItemText}>{framework}</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl className={styles.ItemControl} />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          ))}
        </SegmentGroup.Root>
      )}
    </div>
  )
}

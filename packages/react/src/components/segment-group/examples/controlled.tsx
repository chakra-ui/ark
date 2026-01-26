import { SegmentGroup } from '@ark-ui/react/segment-group'
import { useState } from 'react'
import styles from 'styles/segment-group.module.css'

export const Controlled = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  const [value, setValue] = useState<string | null>(null)
  return (
    <SegmentGroup.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
      <SegmentGroup.Indicator className={styles.Indicator} />
      {frameworks.map((framework) => (
        <SegmentGroup.Item className={styles.Item} key={framework} value={framework}>
          <SegmentGroup.ItemText className={styles.ItemText}>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl className={styles.ItemControl} />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  )
}

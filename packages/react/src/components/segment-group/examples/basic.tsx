import { SegmentGroup } from '@ark-ui/react/segment-group'
import styles from 'styles/segment-group.module.css'

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
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
  )
}

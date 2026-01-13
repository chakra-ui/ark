import { SegmentGroup, useSegmentGroup } from '@ark-ui/react/segment-group'
import styles from 'styles/segment-group.module.css'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  const segmentGroup = useSegmentGroup({ defaultValue: 'React' })

  return (
    <div className="stack">
      <SegmentGroup.RootProvider className={styles.Root} value={segmentGroup}>
        <SegmentGroup.Indicator className={styles.Indicator} />
        {frameworks.map((framework) => (
          <SegmentGroup.Item className={styles.Item} key={framework} value={framework}>
            <SegmentGroup.ItemText className={styles.ItemText}>{framework}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl className={styles.ItemControl} />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.RootProvider>
      <output>selected: {segmentGroup.value}</output>
    </div>
  )
}

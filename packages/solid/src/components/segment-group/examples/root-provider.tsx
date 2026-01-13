import { SegmentGroup, useSegmentGroup } from '@ark-ui/solid/segment-group'
import { Index } from 'solid-js'
import styles from 'styles/segment-group.module.css'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  const segmentGroup = useSegmentGroup({ defaultValue: 'React' })

  return (
    <div class="stack">
      <output>selected: {segmentGroup().value}</output>
      <SegmentGroup.RootProvider class={styles.Root} value={segmentGroup}>
        <SegmentGroup.Indicator class={styles.Indicator} />
        <Index each={frameworks}>
          {(framework) => (
            <SegmentGroup.Item class={styles.Item} value={framework()}>
              <SegmentGroup.ItemText class={styles.ItemText}>{framework()}</SegmentGroup.ItemText>
              <SegmentGroup.ItemControl class={styles.ItemControl} />
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          )}
        </Index>
      </SegmentGroup.RootProvider>
    </div>
  )
}

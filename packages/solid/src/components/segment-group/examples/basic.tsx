import { SegmentGroup } from '@ark-ui/solid/segment-group'
import { For } from 'solid-js'
import styles from 'styles/segment-group.module.css'

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <SegmentGroup.Root class={styles.Root} defaultValue="React">
      <SegmentGroup.Indicator class={styles.Indicator} />
      <For each={frameworks} keyed={false}>
        {(framework) => (
          <SegmentGroup.Item class={styles.Item} value={framework()}>
            <SegmentGroup.ItemText class={styles.ItemText}>{framework()}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl class={styles.ItemControl} />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  )
}

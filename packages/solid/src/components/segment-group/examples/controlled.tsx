import { SegmentGroup } from '@ark-ui/solid/segment-group'
import { Index, createSignal } from 'solid-js'
import styles from 'styles/segment-group.module.css'

export const Controlled = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  const [value, setValue] = createSignal<string | null>(null)

  return (
    <SegmentGroup.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
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
    </SegmentGroup.Root>
  )
}

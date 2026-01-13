import { SegmentGroup } from '@ark-ui/solid/segment-group'
import { Index, Show, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/segment-group.module.css'

export const Conditional = () => {
  const [show, setShow] = createSignal(false)
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

  return (
    <div class="stack">
      <button class={button.Root} onClick={() => setShow(!show())}>
        {show() ? 'Hide' : 'Show'}
      </button>
      <Show when={show()}>
        <SegmentGroup.Root class={styles.Root} defaultValue="React">
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
      </Show>
    </div>
  )
}

import { For } from 'solid-js'
import { SegmentGroup, type SegmentGroupRootProps } from '../'

export const ComponentUnderTest = (props: SegmentGroupRootProps) => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <SegmentGroup.Root {...props}>
      <SegmentGroup.Label>Framework</SegmentGroup.Label>
      <SegmentGroup.Indicator />
      <For each={items}>
        {(item) => (
          <SegmentGroup.Item value={item.value} disabled={item.disabled}>
            <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
          </SegmentGroup.Item>
        )}
      </For>
    </SegmentGroup.Root>
  )
}

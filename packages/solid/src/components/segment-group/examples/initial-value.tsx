import { SegmentGroup } from '@ark-ui/solid/segment-group'
import { Index } from 'solid-js'

export const InitialValue = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <SegmentGroup.Root value="React">
      <SegmentGroup.Indicator />
      <Index each={frameworks}>
        {(framework) => (
          <SegmentGroup.Item value={framework()}>
            <SegmentGroup.ItemText>{framework()}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        )}
      </Index>
    </SegmentGroup.Root>
  )
}

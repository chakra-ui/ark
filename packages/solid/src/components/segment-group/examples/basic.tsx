import { Index } from 'solid-js'
import { SegmentGroup } from '../..'

export const Basic = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <SegmentGroup.Root>
      <SegmentGroup.Indicator />
      <Index each={frameworks}>
        {(framework) => (
          <SegmentGroup.Item value={framework()}>
            <SegmentGroup.ItemText>{framework()}</SegmentGroup.ItemText>
            <SegmentGroup.ItemControl />
          </SegmentGroup.Item>
        )}
      </Index>
    </SegmentGroup.Root>
  )
}

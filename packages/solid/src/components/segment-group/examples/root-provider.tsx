import { SegmentGroup, useSegmentGroup } from '@ark-ui/solid/segment-group'
import { Index } from 'solid-js'

export const RootProvider = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  const segmentGroup = useSegmentGroup()

  return (
    <>
      <button onClick={() => segmentGroup().focus()}>Focus</button>

      <SegmentGroup.RootProvider value={segmentGroup}>
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
      </SegmentGroup.RootProvider>
    </>
  )
}

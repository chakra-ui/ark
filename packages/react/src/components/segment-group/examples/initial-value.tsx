import { SegmentGroup } from '../..'

export const InitialValue = () => {
  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
  return (
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      {frameworks.map((framework) => (
        <SegmentGroup.Item key={framework} value={framework}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      ))}
    </SegmentGroup.Root>
  )
}

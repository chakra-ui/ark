import { SegmentGroup, type SegmentGroupProps } from '~/components/ui'

export const Demo = (props: SegmentGroupProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'svelte', label: 'Svelte', disabled: true },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <SegmentGroup.Root defaultValue="react" orientation="horizontal" {...props}>
      {options.map((option) => (
        <SegmentGroup.Item key={option.id} value={option.id} disabled={option.disabled}>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
        </SegmentGroup.Item>
      ))}
      <SegmentGroup.Indicator />
    </SegmentGroup.Root>
  )
}

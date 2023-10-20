import { SegmentGroup, type SegmentGroupProps } from '~/components/ui/segment-group'

export const SegmentGroupDemo = (props: SegmentGroupProps) => {
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <SegmentGroup.Root defaultValue="react" {...props}>
      {options.map((option, id) => (
        <SegmentGroup.Item key={id} value={option.id} data-orientation={orientation}>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
        </SegmentGroup.Item>
      ))}
      <SegmentGroup.Indicator />
    </SegmentGroup.Root>
  )
}

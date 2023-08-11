import {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentIndicator,
  SegmentInput,
  SegmentLabel,
  type SegmentGroupProps,
} from '~/components/ui/segment-group'

export const SegmentGroupDemo = (props: SegmentGroupProps) => {
  // TODO bug in Ark UI
  const { orientation = 'vertical', ...rest } = props
  const options = [
    { id: 'react', label: 'React' },
    { id: 'solid', label: 'Solid' },
    { id: 'vue', label: 'Vue' },
  ]
  return (
    <SegmentGroup defaultValue="react" orientation={orientation} {...rest}>
      {options.map((option, id) => (
        <Segment key={id} value={option.id} data-orientation={orientation}>
          <SegmentInput data-peer />
          <SegmentControl />
          <SegmentLabel>{option.label}</SegmentLabel>
        </Segment>
      ))}
      <SegmentIndicator />
    </SegmentGroup>
  )
}

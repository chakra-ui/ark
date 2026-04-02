import { DateInput } from '../'

export const ComponentUnderTest = (props: DateInput.RootProps) => (
  <DateInput.Root {...props}>
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.SegmentContext>{(segment) => <DateInput.Segment segment={segment} />}</DateInput.SegmentContext>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

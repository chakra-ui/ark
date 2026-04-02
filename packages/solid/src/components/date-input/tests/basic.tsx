import { DateInput } from '../'
import { Index } from 'solid-js'

export const ComponentUnderTest = (props: DateInput.RootProps) => (
  <DateInput.Root {...props}>
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.Context>
          {(dateInput) => (
            <Index each={dateInput().getSegments()}>{(segment) => <DateInput.Segment segment={segment()} />}</Index>
          )}
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

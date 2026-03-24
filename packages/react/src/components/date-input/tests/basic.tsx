import type { DateSegment } from '@zag-js/date-input'
import { DateInput } from '@ark-ui/react/date-input'

export const ComponentUnderTest = (props: DateInput.RootProps) => (
  <DateInput.Root {...props}>
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.Context>
          {(dateInput) =>
            dateInput
              .getSegments()
              .map((segment: DateSegment, index: number) => (
                <DateInput.Segment key={`${segment.type}-${index}`} segment={segment} />
              ))
          }
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

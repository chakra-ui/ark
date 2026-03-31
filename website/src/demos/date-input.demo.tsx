'use client'
import type { DateSegment } from '@zag-js/date-input'
import { DateInput } from '~/components/ui/date-input'

export const Demo = (props: DateInput.RootProps) => {
  return (
    <DateInput.Root {...props}>
      <DateInput.Label>Date</DateInput.Label>
      <DateInput.Control>
        <DateInput.SegmentGroup>
          <DateInput.Context>
            {(api) =>
              api
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
}

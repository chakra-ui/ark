import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'

export const ComponentUnderTest = (props: DateInput.RootProps) => (
  <DateInput.Root {...props}>
    <DateInput.Label>Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.Context>
          {(dateInput) =>
            dateInput
              .getSegments()
              .map((segment, index) => (
                <DateInput.Segment className={styles.Segment} key={`${segment.type}-${index}`} segment={segment} />
              ))
          }
        </DateInput.Context>
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)

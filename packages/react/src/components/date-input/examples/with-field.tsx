import { Field } from '@ark-ui/react/field'
import { DateInput } from '@ark-ui/react/date-input'
import styles from 'styles/date-input.module.css'
import field from 'styles/field.module.css'

export const WithField = () => {
  return (
    <Field.Root className={field.Root}>
      <DateInput.Root className={styles.Root} name="birthDate">
        <DateInput.Label className={styles.Label}>Birth Date</DateInput.Label>
        <DateInput.Control className={styles.Control}>
          <DateInput.SegmentGroup className={styles.Input}>
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
      <Field.HelperText className={field.HelperText}>Additional Info</Field.HelperText>
      <Field.ErrorText className={field.ErrorText}>Error Message</Field.ErrorText>
    </Field.Root>
  )
}

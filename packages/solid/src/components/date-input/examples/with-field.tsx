import { DateInput } from '@ark-ui/solid/date-input'
import { Field } from '@ark-ui/solid/field'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'
import field from 'styles/field.module.css'

export const WithField = () => (
  <Field.Root class={field.Root}>
    <DateInput.Root class={styles.Root} name="birthDate">
      <DateInput.Label class={styles.Label}>Birth Date</DateInput.Label>
      <DateInput.Control class={styles.Control}>
        <DateInput.SegmentGroup class={styles.Input}>
          <DateInput.Context>
            {(dateInput) => (
              <Index each={dateInput().getSegments()}>{(segment) => <DateInput.Segment segment={segment()} />}</Index>
            )}
          </DateInput.Context>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
    <Field.HelperText class={field.HelperText}>Additional Info</Field.HelperText>
    <Field.ErrorText class={field.ErrorText}>Error Message</Field.ErrorText>
  </Field.Root>
)

import { DateInput } from '@ark-ui/solid/date-input'
import { LocaleProvider } from '@ark-ui/solid/locale'
import { Index } from 'solid-js'
import styles from 'styles/date-input.module.css'

export const RTL = () => (
  <LocaleProvider locale="ar-SA">
    <DateInput.Root class={styles.Root} dir="rtl">
      <DateInput.Label class={styles.Label}>التاريخ</DateInput.Label>
      <DateInput.Control class={styles.Control}>
        <DateInput.SegmentGroup class={styles.SegmentGroup}>
          <DateInput.Context>
            {(dateInput) => (
              <Index each={dateInput().getSegments()}>
                {(segment) => <DateInput.Segment class={styles.Segment} segment={segment()} />}
              </Index>
            )}
          </DateInput.Context>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  </LocaleProvider>
)
